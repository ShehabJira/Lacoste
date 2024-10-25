import PageContent from "../../ui/PageContent";
import ProfileSection from "./ProfileSection";
import PreferencesSection from "./PreferencesSection";
import FaqSection from "./FaqSection";
import HeadingRow from "../../ui/HeadingRow";

function ProfileAndPreferences() {
	return (
		<PageContent>
			<HeadingRow $paddingAround={true}>
				<span>Profile</span>
			</HeadingRow>
			<ProfileSection />
			<HeadingRow $paddingAround={true}>
				<span>Preferences</span>
			</HeadingRow>
			<PreferencesSection />
			<FaqSection />
		</PageContent>
	);
}

export default ProfileAndPreferences;
