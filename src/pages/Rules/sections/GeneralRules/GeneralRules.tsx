import Section from "../../../../components/layout/Section/Section";
import classes from './GeneralRules.module.scss';
import Heading from "../../../../components/typography/Heading";
import Paragraph from "../../../../components/typography/Paragraph";
import { headingTypes } from "../../../../types/types";
import { GAMENAMES } from "../../../../constants/constants";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../../../store/context";
import { useHistory } from "react-router-dom";

const GeneralRules = () => {
    const history = useHistory();
    const [rules, setRules] = useState<JSX.Element[]>([]);
    const context = useContext(Context);
    useEffect(function(){
        if(context.state.games !== undefined){
            let games = [];
            for(let game in context.state.games){
                let gamename = context.state.games[game].name;
                let gameDisplay = GAMENAMES[gamename];
                let url = new URL("/gamepage", window.location.href);
                url.searchParams.append("gamename", gamename);
                games.push(<Paragraph key={gamename} className={classes.GeneralRules__paragraph}><a href={url.href}>{gameDisplay}</a></Paragraph>);
            }
            setRules(games);
        }
    }, [context, history] );

    return <Section className={classes.GeneralRules}>
        <Heading className={classes.GeneralRules__heading} type={headingTypes.h2}>Obecná pravidla turnaje</Heading>
        <Heading className={classes.GeneralRules__subheading} type={headingTypes.h3}>Registrace</Heading>
        <div className={classes.GeneralRules__list}>
        <Paragraph className={classes.GeneralRules__paragraph}>Registrace probíhá přes webové stránky turnaje.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Začátek a konec registrace je uveden na stránkách každé hry</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Každý účastník musí uvést školu, za kterou hraje.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Každý účastník se může zaregistrovat pro danou hru právě jednou.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Žádní dva účastníci nemohou mít stejný discord.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Každý účastník musí být studentem nebo učitelem na střední škole, osmiletém gymnáziu nebo druhém stupni základní školy.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Pokud je účastník žákem základní školy a odpovídajících ročníků osmiletého gymnázia, nejsou mu zpřístupněny všechny hry.  </Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Každý účastník, který nebude v době turnaje plnoletý, musí před začátkem turnaje poslat vyplněný souhlas rodičů s účastí v turnaji na adresu turnajvpocitacovychhrach@gym-tisnov.cz.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Je zakázáno používat vulgární nebo rasistická jména hráčů, vulgární názvy týmů.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Každý účastník je povinen se do dvou dnů od registrace připojit na discord GT Tournamentu.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Organizátor si vyhrazuje právo vyloučit účastníka z turnaje z důvodu porušení pravidel.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Pokud účastník nesouhlasí s rozhodnutím organizátora, může se odvolat k hlavnímu organizátorovi.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Každý účastník je na požádání organizátora povinen prokázat, že je studentem na škole zadané při registraci škole.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Tým musí udržovat svou registraci aktuální.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Organizátor si vyhrazuje právo rozhodovat o případných trestech individuálně.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Organizátor si vyhrazuje právo měnit pravidla a rozhodovat o případných nesrovnalostech.</Paragraph>
        </div>
        <Heading className={classes.GeneralRules__subheading} type={headingTypes.h3}>Průběh turnaje</Heading>
        <div className={classes.GeneralRules__list}>
        <Paragraph className={classes.GeneralRules__paragraph}>Účastník musí dodržovat pravidla hry, ve které soutěží.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Účastník, který se účastní právě probíhajícího zápasu, se nesmí při hře dívat na stream daného zápasu.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Je zakázáno podvádět.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Organizátor si vyhrazuje právo vyloučit hráče či tým z turnaje za nesportovní chování po domluvě s hlavním organizátorem.</Paragraph> 
        <Paragraph className={classes.GeneralRules__paragraph}>Je zakázáno používat vulgární výrazy. (v herním chatu, v chatu na Twitchi, v rozhovoru s organizátory a komentátory)</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Účastník je povinen připravit se ke hře v dostatečném předstihu, aby nezdržoval průběh turnaje.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Turnaje se nemůže účastnit nezaregistrovaný člověk.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Účastník musí během hry používat přezdívku, kterou zadal do registračního formuláře.</Paragraph>
        <Paragraph className={classes.GeneralRules__paragraph}>Účastník musí být po dobu hry přítomen na discordu GT Tournamentu.</Paragraph>
        </div>
        <Heading className={classes.GeneralRules__heading} type={headingTypes.h2}>Pravidla pro jednotlivé hry naleznete na jejich stránkách</Heading>
        <div className={classes.GeneralRules__list}>
            {rules}
        </div>
    </Section>
}

export default GeneralRules;