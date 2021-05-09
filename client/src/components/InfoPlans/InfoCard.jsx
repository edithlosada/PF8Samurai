import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 345,
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function InfoCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label='plans' className={classes.avatar}>
                        P
                    </Avatar>
                }
                title={props.plan.description}
                subheader={props.plan.price}
            />
            <NavLink
                to={`planDetails/${props.plan.id_plan}`}
                style={{ textDecoration: 'none', color: 'black' }}
            >
                Ver mas
            </NavLink>
            <CardContent>
                <Typography>Cobertura:</Typography>
                <Typography>{props.plan.benefits.benefits_title}</Typography>
                {props.plan.benefits.map((d, index) => (
                    <Typography key={`cardInfo-${index}`}>
                        {d.benefit_description}
                    </Typography>
                ))}
            </CardContent>
        </Card>
    );
}

export default InfoCard;
