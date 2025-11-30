import { ContentSection } from "@/components/layout";
import { ProfileForm } from "@/features/profile/profile-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Manage your account settings and set e-mail preferences.",
};

export default function page() {
  return (
    <ContentSection
      title="Profile"
      desc="This is how others will see you on the site."
    >
      <ProfileForm />
    </ContentSection>
  );
}
