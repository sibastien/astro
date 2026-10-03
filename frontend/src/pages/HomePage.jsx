import { useState, useEffect } from 'react';
import SEOMeta from '@/components/seo/SEOMeta';
import { useUserProfile } from '@/context/UserProfileContext';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import PersonalizedDashboard from '@/components/readings/PersonalizedDashboard';
import ProfileModal from '@/components/profile/ProfileModal';

export default function HomePage({ defaultFocus }) {
  const { profile, isOnboardingActive, updateFocus } = useUserProfile();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    if (defaultFocus && profile?.hasCompletedOnboarding) {
      updateFocus(defaultFocus);
    }
  }, [defaultFocus, profile?.hasCompletedOnboarding]);

  return (
    <>
      <SEOMeta
        title="ASTRA — Intelligence Astrologique & Thème Astral"
        description="Plateforme d'analyse astrologique de précision. Découvrez votre profil céleste, vos transits quotidiens et vos prévisions personnalisées."
        canonical="/"
      />

      {/* If user is new or in onboarding flow, show progressive onboarding */}
      {isOnboardingActive || !profile?.hasCompletedOnboarding ? (
        <OnboardingFlow />
      ) : (
        /* If profile exists, show the personalized reading dashboard */
        <PersonalizedDashboard onOpenProfile={() => setIsProfileModalOpen(true)} />
      )}

      {/* Profile inspection & editing modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
}
