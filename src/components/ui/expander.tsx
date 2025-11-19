"use client";

import React, {
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

import { XIcon } from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Transition,
} from "motion/react";

import { Button } from "@/components/ui/button";

import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";

// Types
interface ExpanderContextType {
  isExpanded: boolean;
  cardId: string;
  triggerRef: React.RefObject<HTMLElement | null>;
  toggleExpansion: (expanded: boolean) => void;
}

interface CardContainerProps {
  children: React.ReactNode;
  transition?: Transition;
}

interface BodyProps extends React.ComponentProps<typeof motion.div> {
  children: React.ReactNode;
  className?: string;
}

interface ContentProps extends React.ComponentProps<typeof motion.div> {
  children: React.ReactNode;
  className?: string;
}

interface ViewProps {
  children: React.ReactNode;
  className?: string;
}

interface TitleProps extends React.ComponentProps<typeof motion.h2> {
  children: React.ReactNode;
  className?: string;
}

interface DescriptionProps extends React.ComponentProps<typeof motion.h3> {
  children: React.ReactNode;
  className?: string;
}

interface ImageProps extends React.ComponentProps<typeof motion.img> {
  className?: string;
}

interface CloseButtonProps extends React.ComponentProps<typeof motion.button> {}

// Context
const ExpanderContext = createContext<ExpanderContextType | null>(null);

const useCardContext = () => {
  const context = useContext(ExpanderContext);
  if (!context) {
    throw new Error("useCardContext must be used within a CardProvider");
  }
  return context;
};

// Motion Components
const MotionButton = motion.create(Button);

// Provider
const CardProvider: React.FC<CardContainerProps> = ({
  children,
  transition,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardId = useId();
  const triggerRef = useRef<HTMLElement | null>(null);

  const toggleExpansion = useCallback((expanded: boolean) => {
    setIsExpanded(expanded);
  }, []);

  const contextValue = useMemo(
    () => ({
      isExpanded,
      cardId,
      triggerRef,
      toggleExpansion,
    }),
    [isExpanded, cardId, toggleExpansion]
  );

  return (
    <ExpanderContext.Provider value={contextValue}>
      <MotionConfig
        transition={
          transition ?? {
            type: "spring",
            stiffness: 260,
            damping: 26,
            mass: 0.9,
          }
        }
      >
        {children}
      </MotionConfig>
    </ExpanderContext.Provider>
  );
};

// Main Container
const Expander: React.FC<CardContainerProps> & {
  Body: React.FC<BodyProps>;
  Content: React.FC<ContentProps>;
  View: React.FC<ViewProps>;
  Title: React.FC<TitleProps>;
  Description: React.FC<DescriptionProps>;
  Image: React.FC<ImageProps>;
  CloseButton: React.FC<CloseButtonProps>;
} = ({ children, transition }) => {
  return <CardProvider transition={transition}>{children}</CardProvider>;
};

// Card Body Component
const Body: React.FC<BodyProps> = ({ children, className, ...props }) => {
  const { isExpanded, toggleExpansion, cardId } = useCardContext();

  const handleExpand = useCallback(() => {
    toggleExpansion(true);
  }, [toggleExpansion]);

  return (
    <motion.div
      data-slot="card-body"
      layoutId={`card-container-${cardId}`}
      layout
      className={cn(
        "relative flex flex-col overflow-hidden bg-background",
        "cursor-pointer select-none",
        className
      )}
      onClick={handleExpand}
      aria-haspopup="dialog"
      aria-expanded={isExpanded}
      aria-controls={`expandable-card-${cardId}`}
      style={{
        willChange: "transform, opacity",
        transform: "translateZ(0)",
      }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Card Content Component
const Content: React.FC<ContentProps> = ({ children, className, ...props }) => {
  const { cardId } = useCardContext();

  return (
    <motion.div
      layoutId={`card-content-${cardId}`}
      className={cn("overflow-hidden", className)}
      aria-modal="true"
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 230,
        damping: 24,
        mass: 0.9,
      }}
      style={{ willChange: "transform, opacity" }}
      aria-labelledby={`expandable-card-${cardId}-title`}
      aria-describedby={`expandable-card-${cardId}-description`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const View: React.FC<ViewProps> = ({ children, className }) => {
  const { isExpanded, cardId, toggleExpansion } = useCardContext();
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => {
    toggleExpansion(false);
  });

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence mode="sync">
      {isExpanded && (
        <>
          <motion.div
            data-slot="card-backdrop"
            key={`card-backdrop-${cardId}`}
            className="fixed inset-0 z-50 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />

          <div className="fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 sm:max-w-lg">
            <Body
              ref={containerRef}
              className={cn(
                "pointer-events-auto w-full rounded-lg shadow-xl",
                className
              )}
            >
              {children}
            </Body>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

// Card Title Component
const Title: React.FC<TitleProps> = ({ className, children, ...props }) => {
  const { cardId } = useCardContext();

  return (
    <motion.h2
      layout="position"
      layoutId={`card-title-${cardId}`}
      className={cn(
        "text-lg font-semibold leading-6 tracking-tight p-0 px-4 !m-0 !mt-2",
        className
      )}
      {...props}
    >
      {children}
    </motion.h2>
  );
};

// Card Description Component
const Description: React.FC<DescriptionProps> = ({
  className,
  children,
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

// Card Image Component
const Image: React.FC<ImageProps> = ({ className, ...props }) => {
  return (
    <motion.img
      style={{ willChange: "transform,scale" }}
      className={cn(
        "w-full h-full object-cover object-top not-prose",
        className
      )}
      {...props}
    />
  );
};

// Close Button Component
const CloseButton: React.FC<CloseButtonProps> = ({
  className,
  children,
  ...props
}) => {
  const { toggleExpansion, cardId } = useCardContext();

  const handleClose = useCallback(() => {
    toggleExpansion(false);
  }, [toggleExpansion]);

  return (
    <MotionButton
      layout="position"
      layoutId={`card-close-button-${cardId}`}
      onClick={handleClose}
      aria-label="Close"
      size="icon-sm"
      className={cn(
        "flex absolute top-2 right-2 items-center justify-center rounded-full pointer-events-auto",
        "bg-background/60 hover:bg-background/80 text-foreground/70 cursor-pointer z-[60]",
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      {...props}
    >
      {children ?? <XIcon />}
    </MotionButton>
  );
};

// Display names
Expander.displayName = "Expander";
Body.displayName = "Body";
Content.displayName = "Content";
View.displayName = "View";
Title.displayName = "Title";
Description.displayName = "Description";
Image.displayName = "Image";
CloseButton.displayName = "CloseButton";

Expander.Body = Body;
Expander.Content = Content;
Expander.View = View;
Expander.Title = Title;
Expander.Description = Description;
Expander.Image = Image;
Expander.CloseButton = CloseButton;

export { Expander };
