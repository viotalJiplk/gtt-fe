import classes from './TimeAxis.module.scss';
import React, { useRef, useEffect, useCallback, /*useState,*/ Dispatch, SetStateAction } from 'react';
import { ScheduleDay } from '../../../pages/Home/sections/ThisYear/ThisYear';

interface TimeAxisProps {
    className: string,
    currentDay: string,
    setCurrentDay: Dispatch<SetStateAction<string>>,
    schedule: { [key: string]: ScheduleDay }
}

const TimeAxis: React.FC<TimeAxisProps> = props => {
    const lineRef = useRef(document.createElement('div'));
    const schedule = props.schedule;

    const onResize = useCallback((pointElements: HTMLDivElement[], descriptorElements: HTMLDivElement[]) => {
        const width = lineRef.current.offsetWidth;
        pointElements.forEach((el, id) => {
            const offsetLeft = (width / (pointElements.length - 1)) * +el.dataset.id!;
            el.style.left = `${offsetLeft}px`;
        })
        descriptorElements.forEach((el, id) => {
            const offsetLeft = (width / (descriptorElements.length - 1)) * +el.dataset.id!;
            el.style.left = `${offsetLeft}px`;
        });
    }, []);

    useEffect(() => {
        const element = lineRef.current;
        if (element) {
            const descriptorElements = Array.from(element.querySelectorAll(`.${classes.TimeAxis__descriptor}`)) as HTMLDivElement[];
            const pointElements = Array.from(element.querySelectorAll(`.${classes.TimeAxis__point}`)) as HTMLDivElement[];
            onResize(pointElements, descriptorElements);
            const resizeHandler = () => {
                onResize(pointElements, descriptorElements);
            }
            window.addEventListener('resize', resizeHandler)
            return () => {
                window.removeEventListener('resize', resizeHandler);
            }
        }
    }, [onResize])

    const className = classes.TimeAxis + " " + props.className;
    const points = [];
    const descriptors = [];
    let id = 0;
    for (let dayIndex in schedule) {
        let day = schedule[dayIndex];
        const className = classes.TimeAxis__point  + " " + (dayIndex === props.currentDay ? classes.active : '');
        points.push(
            <div onClick={
                    () => {
                        props.setCurrentDay(dayIndex);
                    }
                }
                data-id={id} key={id} className={className}></div>);
        let date = new Date(day.date);
        descriptors.push(<div data-id={id} key={id} className={classes.TimeAxis__descriptor}>{date.getDate()}.&nbsp;{date.getMonth() + 1 + "."}</div>);
        id++;
    }
    
    return <div className={className}>
        <div ref={lineRef} className={classes.TimeAxis__line}>
            {points}
            {descriptors}
        </div>
    </div>
};

export default TimeAxis;