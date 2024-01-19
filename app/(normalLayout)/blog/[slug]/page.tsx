

// Lib
import { getPost, formattedDate } from '@/utils/blog';

// Components
import TagsList from '@/components/blog/TagsList';
import BackToTop from '@/components/BackToTop';
import NewsletterForm from '@/components/NewsletterForm'

// Style
import styles from '@/styles/blogArticle.module.scss'

// SEO
import { Metadata, ResolvingMetadata } from 'next'

async function getData(slug: string) {
    return await getPost(slug);
}

export async function generateMetadata(
    { params }: { params: { slug: string } },
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // The same request is made twice, but it's cached by Next.js
    const post = await getData(params.slug);
    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            siteName: 'Référentiel National des Bâtiments',
            images: [
                {
                    url: post.feature_image
                }
            ]
        }
    }

}

export default async function Page({
    params
}: {
    params: {slug: string}
}) {


    const post = await getData(params.slug);
    const dateStr = formattedDate(post.published_at)
    
    return (
        <>
            <BackToTop></BackToTop>

            <div className="fr-container">

                <div className="fr-grid-row fr-grid-row--gutters fr-py-12v">


                    <div className="fr-col-12 fr-col-md-8 fr-col-offset-md-2">

                    
                    <div className='fr-mb-8v'>
                        <div><TagsList tags={post.tags}></TagsList></div>
                        <h2 className='fr-my-2v'>{post.title}</h2>
                        <div>Publié le {dateStr}</div>
                    </div>    

                    <p className='fr-text--lead'>{post.excerpt}</p>

                    <div className='fr-mb-16v'>
                    <img className={styles.featureImg} src={post.feature_image} />
                    </div>
                    

                    <div className={styles.articleBody} dangerouslySetInnerHTML={{__html: post.html}}></div>



                    <div className="block block--paleBlue block--smallNewsletterShell fr-mt-24v">
                        
                        <p><b>Inscription infolettre</b><br/>Recevez l&apos;actualité du RNB directement dans votre boite email.</p>
                        <NewsletterForm />
                    </div>  

                    </div>
                    
                </div>
            </div>
        </>
    )
}