import { useEffect, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Link from 'next/link';
import withApollo from '../hoc/withApollo';
import { useLazyGetUser } from '../apollo/actions';

const HeaderLink = ({ children, href, as }) => (
    <Link href={href} as={as}>{children}</Link>
)

const Header = () => {

    const [user, setUser] = useState(null);

    // Mutations

    const [getUser, { data, error }] = useLazyGetUser();

    useEffect(() => {
        getUser();
    }, [])

    const removeHeaderModel = function () {
        document.getElementById('mobileheader').classList.remove('active');
        document.getElementById('overlay').classList.add('hidden');
    }

    useEffect(() => {
        document.getElementById('hamburger').addEventListener('click', function () {
            document.getElementById('mobileheader').classList.add('active');
            document.getElementById('overlay').classList.remove('hidden');
        })
        document.getElementById('closeicon').addEventListener('click', removeHeaderModel)

        document.getElementById('overlay').addEventListener('click', removeHeaderModel)

        document.getElementById('dropdown-title') && document.getElementById('dropdown-title').addEventListener('click', function () {
            this.classList.toggle('active');
            let model = this.nextElementSibling;
            if (model.style.maxHeight) {
                model.style.maxHeight = null
            } else {
                model.style.maxHeight = model.scrollHeight + 'px';
            }
        })
    })

    if (data && data.user) {
        if (!user) {
            setUser(data.user);
        }
    }
    if (data && !data.user) {
        if (user) {
            setUser(null);
        }
    }
    return (
        <div>
            <div className="header_page_mobile_container" id="mobileheader">
                <CloseIcon className="header_page_mobile_close_icon" id="closeicon" />
                <div className="header_page_mobile_list">
                    <ul>
                        <li>
                            <HeaderLink href="/Portfolio">Portfolio</HeaderLink>
                        </li>
                        <li>
                            <HeaderLink href="/forum/Categories">Forum</HeaderLink>
                        </li>
                        <li>
                            <HeaderLink href="/Cv">Cv</HeaderLink>
                        </li>
                    </ul>
                </div>
                {
                    (error || !user) &&
                    <div className="header_page_mobile_auth_container">
                        <div className="header_page_mobile_signup">
                            <HeaderLink href='/Signup'>Sign up</HeaderLink>
                        </div>
                        <div className="header_page_mobile_signin">
                            <HeaderLink href='/Login'>Sign in</HeaderLink>
                        </div>
                    </div>
                }
                {
                    user &&
                    <div className="header_page_mobile_auth_container user">
                        <div className="header_page_mobile_username">
                            Welcome, {user && user.username}
                        </div>
                        <div className="header_page_mobile_signout">
                            <HeaderLink href='/Logout'>Signout</HeaderLink>
                        </div>
                    </div>
                }
            </div>
            <div className="header_main_container">
                <div className="header_logo">
                    <HeaderLink href="/">House Chat</HeaderLink>
                </div>
                <div className="header_page_link_container">
                    <ul>
                        <li>
                            <HeaderLink href="/Portfolio">Portfolio</HeaderLink>
                        </li>
                        <li>
                            <HeaderLink href="/forum/Categories">Forum</HeaderLink>
                        </li>
                        <li>
                            <HeaderLink href="/Cv">Cv</HeaderLink>
                        </li>
                    </ul>
                </div>
                {
                    user &&
                    <>
                        {/* <div className="header_dropdown_container">
                            <div className="header_dropdown_title" id="dropdown-title">
                                Manage
                            </div>
                            <div className="header_manage_dropdown">
                                <ul>
                                    <li><HeaderLink href='/Portfolio/CreatePortfolio'>Create Portfolio</HeaderLink></li>
                                    <li><HeaderLink href='/Instructor/[id]/dashboard' as={`/Instructor/${user._id}/dashboard`}>Dashboard</HeaderLink></li>
                                    <li><HeaderLink href='/Portfolio/CreatePortfolio'>Cv</HeaderLink></li>
                                </ul>
                            </div>
                        </div> */}
                        <div className="header_page_authenticate_container">
                            <div className="header_page_username">
                                Welcome, {user && user.username}
                            </div>
                            <div className="header_page_signout">
                                <HeaderLink href='/Logout'>Signout</HeaderLink>
                            </div>
                        </div>
                    </>
                }
                {
                    (error || !user) &&

                    <div className="header_page_authenticate_container" style={{ marginLeft: "auto" }}>
                        <div className="header_page_signup">
                            <HeaderLink href='/Signup'>Sign up</HeaderLink>
                        </div>
                        <div className="header_page_signin">
                            <HeaderLink href='/Login'>Sign in</HeaderLink>
                        </div>
                    </div>
                }

                <div className="header_page_mobile">
                    <div className="header_page_hamburger"><MenuIcon id="hamburger" /></div>
                </div>
            </div>
            <div className="header_page_mobile_overlay hidden" id="overlay"></div>
        </div>
    )
}

export default withApollo(Header);