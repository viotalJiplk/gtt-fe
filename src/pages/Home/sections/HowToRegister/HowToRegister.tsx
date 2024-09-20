import Section from '../../../../components/layout/Section/Section';
import Heading from '../../../../components/typography/Heading';
import BlueButton from '../../../../components/layout/Buttons/Blue/Blue';
import { withRouter } from 'react-router';
import { headingTypes } from '../../../../types/types';
import { RouteComponentProps } from 'react-router';
import { NavLink } from 'react-router-dom';
import Paragraph from '../../../../components/typography/Paragraph';
import classes from './HowToRegister.module.scss';

const HowToRegister: React.FC<RouteComponentProps> = (props) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const videoWidth = (width/height > 1)? width/2: width - 50;
    return <Section className={classes.HowToRegister}>
        <Heading className={classes.HowToRegister__heading} type={headingTypes.h1}>Jak se přihlásit?</Heading>
        <Paragraph className={classes.HowToRegister__paragraph}>
            Abyste se mohli přihlásit, musí být Vaše škola na seznamu pozvaných škol. Na seznam pozvaných škol se můžete podívat <span className={classes.HowToRegister__link}><NavLink to="/schools">zde</NavLink></span>.
        </Paragraph>
        <Paragraph className={[classes.HowToRegister__paragraph, classes.HowToRegister__paragraph_detail].join(' ')}>
           Pokud Vaše škola není na seznamu pozvaných škol, neváhejte nám napsat na Discord.
           Třeba ji ještě stihneme pozvat!
        </Paragraph>
        <iframe width={videoWidth} height={3/5*videoWidth} src="https://www.youtube-nocookie.com/embed/NWt8VuxxHoA?si=3pu4ZfjiZNlPsoww" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        <Paragraph className={classes.HowToRegister__paragraph}>
            Nejdříve si musíte <span className={classes.HowToRegister__link}><NavLink to="/account">vytvořit účet</NavLink></span>. (Nezapomeň vyplnit důležité informace, které o tobě potřebujeme vědět.)
        </Paragraph>
        <BlueButton onClick={() => {
            props.history.push('/account')
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        }} className={classes.HowToRegister__cta}>
            Vytvoř účet
        </BlueButton>    
        <Paragraph className={classes.HowToRegister__paragraph}>
           Pak už stačí jenom přečíst <span className={classes.HowToRegister__link}><NavLink to="/rules">pravidla</NavLink></span> (jsou důležitá), najít spoluhráče, kliknout na tlačítko níže, vytvořit nový tým a pozvat do něj své spoluhráče! 
        </Paragraph>
        <BlueButton onClick={() => {
            props.history.push('/join')
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        }} className={classes.HowToRegister__cta}>
            Založ tým
        </BlueButton>
        <Heading className={classes.HowToRegister__heading} type={headingTypes.h1}>Jak přizvat spoluhráče?</Heading>
        <ol className={classes.HowToRegister__ol}>
            <li>Přejděte na záložku Moje týmy.</li>
            <li>Rozklikněte tým.</li>
            <li>Vygenerujte odkaz.</li>
            <li>Pošlete odkaz vašim spoluhráčům.</li>
        </ol>

    </Section>
};

export default withRouter(HowToRegister);