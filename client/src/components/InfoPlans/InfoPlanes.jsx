import React, { useState, useEffect } from 'react';
import InfoCard from './InfoCard';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import * as Styles from './InfoPlans.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getPlans } from '../../actions/getter.action';
import { teal } from '@material-ui/core/colors';

function InfoPlanes() {
    const plans = useSelector((state) => state.allPlans);
    const dispatch = useDispatch();

    const [currCard, setCurrCard] = useState(0);
    const [shouldAutoSlide,setAutoSlide] = useState(true);

    const leftPlan = plans[currCard > 1 ? currCard - 1 : plans.length - 1];
    const plan = plans[currCard];
    const rightPlan = plans[currCard < plans.length - 1 ? currCard + 1 : 0];

    const forward = () => {
        if(shouldAutoSlide){
            setAutoSlide(false);
        }
        currCard < plans.length - 1
            ? setCurrCard(currCard + 1)
            : setCurrCard(0);
    };

    const back = () => {
        if(shouldAutoSlide){
            setAutoSlide(false);
        }
        currCard > 0
            ? setCurrCard(currCard - 1)
            : setCurrCard(plans.length - 1);
    };

    const autoSlide=()=>{
        currCard < plans.length - 1
            ? setCurrCard(currCard + 1)
            : setCurrCard(0);
    }

    setTimeout(()=>{
        if(shouldAutoSlide){
            autoSlide()
        }
    },2500);

    useEffect(() => {
        dispatch(getPlans());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (plans.length === 0) return <h2>Loading...</h2>;

    return (
        <div className={Styles.carousel}>
            <div className={Styles.left} onClick={back}>
                <ArrowBackIosIcon style={{ color: teal[300] }} />
            </div>
            <div className={Styles.card}>
                <InfoCard
                    key={leftPlan.id_plan}
                    className={Styles.center}
                    plan={leftPlan}
                />
                <InfoCard
                    key={plan.id_plan}
                    className={Styles.center}
                    plan={plan}
                />
                <InfoCard
                    key={rightPlan.id_plan}
                    className={Styles.center}
                    plan={rightPlan}
                />
            </div>
            <div className={Styles.right} onClick={forward}>
                <ArrowForwardIosIcon style={{ color: teal[300] }} />
            </div>
        </div>
    );
}

export default InfoPlanes;
