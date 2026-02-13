import type { GitHubUser } from '../types'

interface UserCardProps {
    user: GitHubUser
}

export default function UserCard({ user }: UserCardProps) {
    return (
        <div className='user-card'>
            <img
                src={user.avatar_url}
                alt={user.login}
                className='user-avatar'
            />

            <div className='user-info'>
                <h2 className='user-name'>{user.name || user.login}</h2>
                <a
                    href={user.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='user-username'
                >
                    @{user.login}
                </a>

                {user.bio && <p className='user-bio'>{user.bio}</p>}

                <div className='user-stats'>
                    <div className='stat'>
                        <span className='stat-value'>{user.followers}</span>
                        <span className='stat-label'>Followers</span>
                    </div>
                    <div className='stat'>
                        <span className='stat-value'>{user.following}</span>
                        <span className='stat-label'>Following</span>
                    </div>
                    <div className='stat'>
                        <span className='stat-value'>{user.public_repos}</span>
                        <span className='stat-label'>Repos</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
