import GitHubIcon from '@material-ui/icons/GitHub';
import Link from 'next/link';

export default function Footer() {
    return (
        <div className="footer_main_container">
            <div className="footer_main_icon_container">
                <a href='https://github.com/SujithGunasekaran' target='_blank' rel='noreference'>
                    <GitHubIcon className="footer_main_icon" />
                </a>
            </div>
            <div className="footer_main_info">Knowledge Sharing Platform</div>
        </div>
    )
}