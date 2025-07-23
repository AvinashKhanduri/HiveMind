import MainPoster from "../components/Home/MainPoster";
import TeamsAndProjects from "../components/Home/TeamsAndProjects";
import HowItWorks from "../components/Home/HowItWorks"
import FeaturedTechTags from "../components/Home/FeatureTechTags";
import JoinUsSection from "../components/Home/JoinUsSection";
const HomePage = () => {


    return (
        <>
            <MainPoster />
            <TeamsAndProjects />
            <HowItWorks />
            <div
             className=" flex flex-col lg:flex-row flex-wrap justify-center gap-4">
                <FeaturedTechTags />
                <JoinUsSection />
            </div>

           


        </>
    );
};

export default HomePage;
