


// Styles
import styles from '@/styles/summerGames.module.scss'
import RankTable from './rankTable'

// Utils
import { getSummerGamesData } from '@/utils/summergames';

export const revalidate = 10


export default async function SummerGame() {


    const ranks = await getSummerGamesData();    

    console.log('homeblock')
    console.log(ranks)


    return (
        <>
        <div className={`section section_big ${styles.seriousShell}`}>

            <div className={styles.shell}>
            

            
                <div className={`section__titleblock ${styles.titleShell}`}>
                    <h2 className="section__title">Les jeux d'été du RNB</h2>
                    
                    <p className={`section__subtitle ${styles.instruction}`}>
                        Cet été, <a href="/carte">contribuez au RNB</a> et mettez votre département en haut du podium
                    </p>



                </div>

                <div className={styles.progressShell}>




                <div className={styles.barShell}>
                        
                            <div className={styles.legend}>Objectif partagé : {ranks.shared.goal} signalements</div>

                            <div className={styles.bar}>
                                <div className={styles.progress} style={{width: ranks.shared.percent + '%'}}><span className={styles.progressTotal}>{ranks.shared.absolute}</span></div>
                            </div>
                        
                </div>

                <div className={styles.ranks}>

                    <div className={styles.ranksTable}>


                        <RankTable title="Classement des départements" ranks={ranks.department} limit={5} />

                    </div>


                    <div className={styles.ranksTable}>

                    <RankTable title="Classement des villes" ranks={ranks.city} limit={5} />
    


</div>

                    <div className={styles.ranksTable}>

                    <RankTable title="Classement des contributeurs" ranks={ranks.individual} limit={5} />
                        


                    </div>


                </div>

                <div className={styles.ranksExplain}>Le classement se fait par nombre de signalements d'erreurs récoltés.</div>

                <div className={styles.buttonsShell}>
                    <a href="/carte" className={styles.btn + ' ' + styles.btn_primary}>Participer aux jeux</a>
                    
                </div>

                </div>
                </div>

        </div>
        </>
    )
}