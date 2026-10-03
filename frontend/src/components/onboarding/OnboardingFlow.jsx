import { useUserProfile } from '@/context/UserProfileContext';
import WelcomeScreen from './WelcomeScreen';
import PersonalInfoStep from './PersonalInfoStep';
import ExperienceSelectionStep from './ExperienceSelectionStep';

export default function OnboardingFlow() {
  const {
    onboardingStep,
    setOnboardingStep,
    savePersonalInfo,
    selectFirstExperience,
    profile,
  } = useUserProfile();

  return (
    <div className="min-h-screen bg-cosmic-ambient flex flex-col justify-center relative">
      {/* Precision ambient background grid */}
      <div className="absolute inset-0 bg-precision-grid pointer-events-none opacity-40" />

      {/* Screen 1: Welcome */}
      {onboardingStep === 1 && (
        <WelcomeScreen onStart={() => setOnboardingStep(2)} />
      )}

      {/* Screen 2: Personal Information */}
      {onboardingStep === 2 && (
        <PersonalInfoStep
          onComplete={(data) => {
            savePersonalInfo(data);
          }}
          onBack={() => setOnboardingStep(1)}
        />
      )}

      {/* Screen 3: Choose First Experience */}
      {onboardingStep === 3 && (
        <ExperienceSelectionStep
          userName={profile?.name}
          sunSign={profile?.sunSign}
          onSelect={(focusKey) => {
            selectFirstExperience(focusKey);
          }}
        />
      )}
    </div>
  );
}
