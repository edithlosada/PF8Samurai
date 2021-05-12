import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './InfoCard.module.css';
import logoNav from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function InfoCard(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={(classes.media, styles.picture)}
                    image={logoNav}
                    title='Logo'
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' /*component='h2' */>
                        {props.plan.description}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                    >
                        {props.plan.benefits.benefits_title}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography paragraph>Cobertura:</Typography>
                    <Typography paragraph>
                        {props.plan.benefits.benefit_title}
                    </Typography>
                    {props.plan.benefits.map((d, index) => (
                        <Typography key={`cardInfo-${index}`} paragraph>
                            {d.benefit_title}
                        </Typography>
                    ))}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <NavLink to={`planDetails/${props.plan.id_plan}`}>
                    <Button size='small' color='primary'>
                        Mas información
                    </Button>
                </NavLink>
            </CardActions>
        </Card>
    );
}
