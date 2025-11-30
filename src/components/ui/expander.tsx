"use client";

import { XIcon } from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Transition,
} from "motion/react";
import React, {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { RemoveScroll } from "react-remove-scroll";

import { Button } from "@/components/ui/button";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";

type TMotionDivProps = ComponentProps<typeof motion.div>;
type TMotionImgProps = ComponentProps<typeof motion.img>;
type TMotionButtonProps = ComponentProps<typeof motion.button>;
type TMotionH2Props = ComponentProps<typeof motion.h2>;
type TMotionH3Props = ComponentProps<typeof motion.h3>;
export interface IViewProps {
  children: React.ReactNode;
  className?: string;
}

interface ICardContainerProps {
  children: React.ReactNode;
  transition?: Transition;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}
export type IExpander = React.FC<
  Omit<ICardContainerProps, "children"> & React.PropsWithChildren
> & {
  Trigger: React.FC<TMotionDivProps & { underView?: boolean }>;
  Content: React.FC<TMotionDivProps>;
  View: React.FC<IViewProps>;
  Title: React.FC<TMotionH2Props>;
  Description: React.FC<TMotionH3Props>;
  Image: React.FC<TMotionImgProps>;
  CloseButton: React.FC<TMotionButtonProps>;
};
interface IExpanderContext {
  isExpanded: boolean;
  cardId: string;
  toggleExpansion: (expanded: boolean) => void;
  isControlled: boolean;
  modal?: boolean;
}

const ExpanderContext = createContext<IExpanderContext | null>(null);

const useCardContext = () => {
  const context = useContext(ExpanderContext);
  if (!context) {
    throw new Error("useCardContext must be used within a CardProvider");
  }
  return context;
};

// Motion Button Wrapper
const MotionButton = motion.create(Button);

const CardProvider: React.FC<ICardContainerProps> = ({
  children,
  transition,
  open,
  onOpenChange,
  modal,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = typeof open === "boolean";
  const isExpanded = isControlled ? !!open : internalOpen;

  const cardId = useId();

  const toggleExpansion = useCallback(
    (expanded: boolean) => {
      if (!isControlled) setInternalOpen(expanded);
      onOpenChange?.(expanded);
    },
    [isControlled, onOpenChange]
  );

  const ctxValue = useMemo(
    () => ({ isExpanded, cardId, toggleExpansion, isControlled, modal }),
    [isExpanded, cardId, toggleExpansion, isControlled, modal]
  );

  useEffect(() => {
    if (!isControlled || !isExpanded) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        toggleExpansion(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isControlled, isExpanded, toggleExpansion]);

  return (
    <ExpanderContext.Provider value={ctxValue}>
      <MotionConfig
        transition={
          transition ?? {
            type: "tween",
            duration: 0.28,
            ease: [0.22, 0.61, 0.36, 1],
          }
        }
      >
        {children}
      </MotionConfig>
    </ExpanderContext.Provider>
  );
};

const Expander: IExpander = ({
  children,
  transition,
  open,
  onOpenChange,
  modal,
}) => {
  return (
    <CardProvider
      transition={transition}
      open={open}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      {children}
    </CardProvider>
  );
};

const Trigger: React.FC<
  TMotionDivProps & {
    underView?: boolean;
  }
> = ({ children, className, underView = false, ...props }) => {
  const { cardId, toggleExpansion, isExpanded, isControlled } =
    useCardContext();

  return (
    <motion.div
      data-slot="card-trigger"
      layoutId={`card-container-${cardId}`}
      className={cn(
        "relative flex flex-col overflow-hidden bg-background cursor-pointer select-none",

        className
      )}
      onClick={() =>
        isControlled || underView ? null : toggleExpansion(!isExpanded)
      }
      aria-expanded={isExpanded}
      aria-haspopup="dialog"
      aria-controls={`expandable-card-${cardId}`}
      // whileHover={{ scale: 1.005 }}
      // whileTap={{ scale: 0.995 }}
      style={{
        willChange: "transform, opacity",
        transform: "translateZ(0)",
      }}
      tabIndex={0}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const Content: React.FC<TMotionDivProps> = ({
  children,
  className,
  ...props
}) => {
  const { cardId } = useCardContext();

  return (
    <motion.div
      layoutId={`card-content-${cardId}`}
      aria-modal="true"
      className={cn("overflow-hidden", className)}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
      aria-labelledby={`expandable-card-${cardId}-title`}
      aria-describedby={`expandable-card-${cardId}-description`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const View: React.FC<IViewProps> = ({ children, className }) => {
  const { isExpanded, cardId, toggleExpansion, modal } = useCardContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => !modal && toggleExpansion(false));

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Autofocus inside portal when it opens
  useEffect(() => {
    if (!isExpanded) return;
    const raf = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;

      const focusable = container.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      (focusable ?? container).focus();
    });
    return () => cancelAnimationFrame(raf);
  }, [isExpanded]);

  // Simple focus trap: keep Tab inside container
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !containerRef.current) return;

    const focusableEls = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled"));

    if (focusableEls.length === 0) {
      e.preventDefault();
      containerRef.current.focus();
      return;
    }

    const first = focusableEls[0];
    const last = focusableEls[focusableEls.length - 1];

    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="sync" initial={false}>
      {isExpanded && (
        <>
          <motion.div
            key={`backdrop-${cardId}`}
            className="fixed inset-0 z-50 bg-background/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          <RemoveScroll enabled>
            <div
              className="fixed top-1/2 left-1/2 z-50 w-auto max-w-[calc(100%-2rem)] sm:max-w-lg -translate-x-1/2 -translate-y-1/2"
              onKeyDown={handleKeyDown}
            >
              <Expander.Trigger
                underView
                ref={containerRef}
                tabIndex={-1}
                className={cn("focus:outline-none", className)}
              >
                {children}
              </Expander.Trigger>
            </div>
          </RemoveScroll>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

const Title: React.FC<TMotionH2Props> = ({ children, className, ...props }) => {
  const { cardId } = useCardContext();
  return (
    <motion.h2
      layout="position"
      layoutId={`card-title-${cardId}`}
      className={cn(
        "text-lg font-semibold tracking-tight px-4 mt-2",
        className
      )}
      {...props}
    >
      {children}
    </motion.h2>
  );
};

const Description: React.FC<TMotionH3Props> = ({
  children,
  className,
  ...props
}) => {
  const { cardId } = useCardContext();
  return (
    <motion.h3
      id={`card-description-${cardId}`}
      layout="position"
      layoutId={`card-description-${cardId}`}
      className={cn("text-sm text-muted-foreground px-4", className)}
      {...props}
    >
      {children}
    </motion.h3>
  );
};

const Image: React.FC<TMotionImgProps> = ({ className, ...props }) => {
  return (
    <motion.img
      className={cn("w-full h-full object-cover object-top", className)}
      style={{ willChange: "transform,scale" }}
      {...props}
    />
  );
};

const CloseButton: React.FC<TMotionButtonProps> = ({
  className,
  children,
  ...props
}) => {
  const { toggleExpansion, cardId } = useCardContext();

  return (
    <MotionButton
      layout="position"
      layoutId={`card-close-button-${cardId}`}
      onClick={() => toggleExpansion(false)}
      aria-label="Close"
      size="icon-sm"
      className={cn(
        "absolute top-2 right-2 z-50 flex items-center justify-center rounded-full bg-background/60 hover:bg-background/80 text-foreground/70",
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
      {...props}
    >
      {children ?? <XIcon />}
    </MotionButton>
  );
};

Expander.displayName = "Expander";
Expander.Trigger = Trigger;
Expander.Content = Content;
Expander.View = View;
Expander.Title = Title;
Expander.Description = Description;
Expander.Image = Image;
Expander.CloseButton = CloseButton;

export { Expander };
