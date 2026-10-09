import type { FC } from 'react';
import type { SectionProps } from '../types';
import style from './Players.module.less'
import Animation from '../components/Animation'
import { about, backgrounds, mascot, players } from '../config/site';

const Players: FC<SectionProps> = ({ active }) => {

    return (
        <div className={style['players']} style={{ backgroundImage: `var(--overlay), url("${backgrounds.players}")` }}>
            <Animation
                play={active}
                base={style['sh']}
                before={{ x: '-120%' }}
                after={{ x: 0 }}>
                <img src={mascot.image} alt={mascot.name} />
            </Animation>
            <div className={style['inner']}>
                <Animation
                    play={active}
                    base={style['left-op-list']}
                    before={{ x: -80, opacity: 0 }}
                    after={{ x: 0, opacity: 1 }}>
                    <h2 className={style['title']}>
                        <span>PLAYERS</span>
                        RVE 的玩家们
                    </h2>
                    <ul>
                        {players.map(player => (
                            <li key={player.id}>
                                <div className={style['avatar']}>
                                    {player.avatar
                                        ? <img src={player.avatar} alt={player.name} loading='lazy' />
                                        : <span className={style['placeholder']} aria-hidden>?</span>}
                                </div>
                                <span className={style['player-title']}>{player.title}</span>
                                <span className={style['player-name']}>{player.name}</span>
                            </li>
                        ))}
                    </ul>
                </Animation>
                <Animation
                    play={active}
                    delay={0.15}
                    base={style['right-message']}
                    before={{ x: 80, opacity: 0 }}
                    after={{ x: 0, opacity: 1 }}>
                    <h3>{about.title}</h3>
                    {about.paragraphs.map(text => <p key={text}>{text}</p>)}
                </Animation>
            </div>
        </div>
    );
};

export default Players;
