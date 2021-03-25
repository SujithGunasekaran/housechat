import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import DeviceHubRoundedIcon from '@material-ui/icons/DeviceHubRounded';
import LayersRoundedIcon from '@material-ui/icons/LayersRounded';

const Hero = () => {
    return (
        <div>
            <div className="hero_main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="hero_top_head_section">
                                <div className="hero_top_title">Find the best answer</div>
                                <div className="hero_top_info">A community-based space to find and contribute answers to technical challenges. Knowledge is reused and collaboration happens asynchronously, especially crucial in a remote, fully-distributed environment. House Chat is the free knowledge sharing and collabration platform.</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img src='/assert/home_search.svg' width='100%' height='100%' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="hero_middle_section_container">
                                <div className="hero_middle_section">
                                    <SearchRoundedIcon className="hero_middle_icon" />
                                    <div className="hero_middle_para">A public platform building the definitive collection of coding questions & answers. Knowledge is reused.</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="hero_middle_section_container">
                                <div className="hero_middle_section">
                                    <DeviceHubRoundedIcon className="hero_middle_icon" />
                                    <div className="hero_middle_para">Explore technical topics and other disciplines across 170+ Q&A communities with distributed environment</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="hero_middle_section_container">
                                <div className="hero_middle_section left">
                                    <LayersRoundedIcon className="hero_middle_icon" />
                                    <div className="hero_middle_para">Help engineers be more efficient and streamline knowledge sharing using a tool they already love and trust.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Hero;