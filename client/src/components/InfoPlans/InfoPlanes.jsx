import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPlans } from '../../actions/getter.action'
import MediaCard from './MediaCard';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import supabase from '../../supabase.config';
import { teal } from '@material-ui/core/colors';

import * as styles from './InfoPlans.module.css';
function InfoPlanes() {
    // const [plans, setPlans] = useState([]);
    const plans = useSelector((state) => state.allPlans);    
    const dispatch = useDispatch();
    // useEffect(() => {
    //     const fetchPlans = async () => {
    //         let { data: plans } = await supabase.from('plans').select('*');
    //         setPlans(plans);
    //     };
    //     fetchPlans();
    // }, []);
    useEffect(() => {
        dispatch(getPlans())
    }, []);

    const [currCard, setCurrCard] = useState(0);
    const [shouldAutoSlide,setAutoSlide] = useState(true);

    if (plans.length === 0) return <h1>Cargando...</h1>;

    const leftPlan = plans[currCard > 1 ? currCard - 1 : plans.length - 1];
    const plan = plans[currCard];
    const rightPlan = plans[currCard < plans.length - 1 ? currCard + 1 : 0];

    const forward = () =>{
        if(shouldAutoSlide){
            setAutoSlide(false);
        }
        currCard < plans.length - 1 ? setCurrCard(currCard + 1) : setCurrCard(0);
    }
    const back = () =>{
        if(shouldAutoSlide){
            setAutoSlide(false);
        }
        currCard > 0 ? setCurrCard(currCard - 1) : setCurrCard(plans.length - 1);
    }
    
    const autoSlide=()=>{
        currCard < plans.length - 1 ? setCurrCard(currCard + 1) : setCurrCard(0);
    }

    setTimeout(()=>{
        if(shouldAutoSlide){
            autoSlide()
        }
    },2000);

    return (
        <div className={styles.carousel}>
            <div className={styles.left} onClick={back}>
                <ArrowBackIosIcon style={{ color: teal[300] }} />
            </div>
            <div className={styles.card}>
                <MediaCard plan={leftPlan} />
                <MediaCard plan={plan} />
                <MediaCard plan={rightPlan} />
            </div>
            <div className={styles.right} onClick={forward}>
                <ArrowForwardIosIcon style={{ color: teal[300] }} />
            </div>
        </div>
    );
}

export default InfoPlanes;
