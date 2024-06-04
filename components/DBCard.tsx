// Styles
import styles from '@/styles/dbcard.module.scss'

// Components
import ImageNext from 'next/image'
import Badge from '@codegouvfr/react-dsfr/Badge';

export default function Entry({db, }) {

    const imagePath = function(filaname: string) {
        return `/images/databases/${filaname}`
    }

    return (
        <>
            
            

                <div className={styles.card}>

                    <div className={styles.logoShell}>
                    <ImageNext className={styles.logo} width="30" height="30" src={imagePath(db.image)} alt={db.name} />
                    </div>
                    <div className={styles.body}>


                        <div className={styles.titleBlock}>
                            <h3 className={styles.title}><a href={db.url}>{db.name}</a></h3>
                            <div className={styles.meta}>
                                <span>Editée par {db.published_by}</span>
                                <span>{db.licence}</span>
                            </div>
                        </div>
                        
                        
                        <p className={styles.description}>
                            {db.description}
                        </p>
                        <div>
                            {db.tags.map((tag) => (
                                <span className={styles.tagShell} key={tag}><Badge severity='info' noIcon small>{tag}</Badge></span>
                                
                            ))}
                        </div>
                        
                    </div>

                    
                    
                

                </div>
                

            


            
            
        </>
    )

}