import { useEffect, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Link from 'next/link';
import withApollo from '../hoc/withApollo';
import { useLazyGetUser } from '../apollo/actions';
import PersonIcon from '@material-ui/icons/Person';
import Model from './Model';
import { useRouter } from 'next/router';

const HeaderLink = ({ children, href, as }) => {

    return (
        <Link href={href} as={as}>
            {children}
        </Link>
    )
}

const Header = () => {

    const [user, setUser] = useState(null);
    const [showUserDropdown, setShowUserDropDown] = useState(false);
    const [showLogoutModel, setShowLogoutModel] = useState(false);

    // Mutations
    const [getUser, { data, error }] = useLazyGetUser();

    const router = useRouter();

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

    const handleLogout = () => {
        setShowLogoutModel(false);
        router.push('/Logout');
    }

    const handleSignoutBtn = () => {
        setShowUserDropDown(false);
        setShowLogoutModel(true);
    }

    return (
        <div>
            <div className="header_page_mobile_container" id="mobileheader">
                <CloseIcon className="header_page_mobile_close_icon" id="closeicon" />
                <div className="header_page_mobile_list">
                    <ul>
                        <li>
                            <HeaderLink id="closeicon" href="/forum/Categories">Forum</HeaderLink>
                        </li>
                    </ul>
                </div>
                {
                    (error || !user) &&
                    <div className="header_page_mobile_auth_container">
                        <div className="header_page_mobile_signup">
                            <HeaderLink href='/Signup' id="closeicon">Sign up</HeaderLink>
                        </div>
                        <div className="header_page_mobile_signin">
                            <HeaderLink href='/Login' id="closeicon">Sign in</HeaderLink>
                        </div>
                    </div>
                }
            </div>
            <div className="header_main_container">
                <div className="header_logo">
                    <HeaderLink href="/">HouseChat</HeaderLink>
                </div>
                <div className="header_page_link_container">
                    <ul>
                        <li>
                            <HeaderLink href="/forum/Categories">Forum</HeaderLink>
                        </li>
                    </ul>
                </div>
                {
                    user &&
                    <>
                        <div className="header_page_authenticate_container">
                            <div className="header_page_username">
                                Welcome, {user && user.username}
                            </div>

                            {/* <div className="header_page_signout">
                                <HeaderLink href='/Logout'>Signout</HeaderLink>
                            </div> */}
                        </div>
                        <div className="header_page_user_dropdown_container">
                            <div className="header_page_user_background" onClick={() => setShowUserDropDown(!showUserDropdown)}>
                                <PersonIcon className="header_page_user_profile" />
                            </div>
                            <div className={`header_page_user_profile_info ${showUserDropdown ? 'active' : ''}`} onClick={() => setShowUserDropDown(false)}>
                                <div id="closeProfile">
                                    <Link href={`/profile/[id]`} as={`/profile/${user?._id}`}>
                                        Profile
                                    </Link>
                                </div>
                                <div className="header_page_signout" onClick={() => handleSignoutBtn()}>
                                    Signout
                                    {/* <HeaderLink href='/Logout'>Signout</HeaderLink> */}
                                </div>
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

                <div className={`header_page_mobile ${!user ? 'header_hamburger_left' : ''}`}>
                    <div className="header_page_hamburger"><MenuIcon id="hamburger" /></div>
                </div>
            </div>
            {
                showLogoutModel &&
                <div className="header_page_logout_model_container">
                    <div className="header_page_logout_model">
                        <Model
                            title="Are you sure, You want to logout"
                            successBtn="Yes"
                            cancelBtn="cancel"
                            onSuccess={handleLogout}
                            onCancel={() => {
                                setShowLogoutModel(false);
                            }}
                        />
                    </div>
                </div>
            }
            <div className="header_page_mobile_overlay hidden" id="overlay"></div>
        </div>
    )
}

export default withApollo(Header);
