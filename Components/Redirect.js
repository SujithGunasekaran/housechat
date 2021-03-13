import { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function Redirect({ path, query }) {
    const router = useRouter();
    useEffect(() => {
        router.push({ pathname: path, query: query })
    }, [])
    return null;
}