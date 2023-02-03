import React, { useEffect, useState } from 'react'
import API from '../../api'
import Comments from '../Comments/Comments';

import styles from './post.module.css'

function Posts()
{
    const [posts, setPosts] = useState([])
    const [clickedPostId, setClickedPostId] = useState(0)
    const [finish, setFinish] = useState(false)

    useEffect(() =>
    {
        API.get('posts').then(
            resp => { setPosts(resp.data), setFinish(true) }
        )
    }, [])

    const handleOnClik = (idsnik) =>
    {
        if (clickedPostId === idsnik) setClickedPostId(0)
        else setClickedPostId(idsnik)
    }

    return (
        <>
            {finish ?
                <ul className={styles.ul}>
                    {posts.map(p =>
                        <li className={p.id === clickedPostId ? styles.activeButton : styles.none} key={p.id}>
                            <div className={styles.list}>
                                <p>{p.title} </p>
                                <button onClick={() => handleOnClik(p.id)}>Comment</button>
                            </div>
                            {(p.id === clickedPostId) && <Comments comment={p.body} />}
                        </li>
                    )}
                </ul>
                : <h2 className={styles.loading}>Идёт загрузка</h2>
            }
        </>
        
    )
}

export default Posts