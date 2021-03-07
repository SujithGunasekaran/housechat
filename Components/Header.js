import { useEffect, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Link from 'next/link';
import withApollo from '../hoc/withApollo';
import { useLazyGetUser } from '../apollo/actions';

const HeaderLink = ({ children, href }) => (
    <Link href={href}>{children}</Link>
)

const Header = () => {

    const [user, setUser] = useState(null);

    // Mutations

    const [getUser, { data, error }] = useLazyGetUser();

    useEffect(() => {
        getUser();
    }, [])

    useEffect(() => {
        document.getElementById('hamburger').addEventListener('click', () => {
            document.getElementById('mobileheader').classList.add('active');
        })
        document.getElementById('closeicon').addEventListener('click', () => {
            document.getElementById('mobileheader').classList.remove('active');
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
            </div>
            <div className="header_main_container">
                <div className="header_logo">
                    <HeaderLink href="/">Sujith_Guna</HeaderLink>
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
                    <div className="header_page_authenticate_container">
                        <div className="header_page_username">
                            Welcome, {user && user.username}
                        </div>
                        <div className="header_page_signout">
                            <HeaderLink href='/Logout'>Signout</HeaderLink>
                        </div>
                    </div>
                }
                {
                    (error || !user) &&
                    <div className="header_page_authenticate_container">
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
        </div>
    )
}

export default withApollo(Header);