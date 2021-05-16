/* import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { teal } from '@material-ui/core/colors';
import { NavLink } from 'react-router-dom';
import styles from './InfoCard.module.css'
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    avatar: {
        backgroundColor: teal ['A100'],
    },
}));
export default function InfoCard(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root, styles.root}>
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
                path
                to={`planDetails/${props.plan.id_plan}`}
                style={{ textDecoration: 'none', color: 'black' }}
            >
                Ver mas
            </NavLink>
            <CardContent>
                <Typography paragraph>Cobertura:</Typography>
                <Typography paragraph>
                    {props.plan.benefits.benefits_title}
                </Typography>
                {props.plan.benefits.map((d, index) => (
                    <Typography key={`cardInfo-${index}`} paragraph>
                        {d.benefit_description}
                    </Typography>
                ))}
            </CardContent>
        </Card>
    );
} */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import styles from './InfoCard.module.css';
import logoNav from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      position: 'relative',
      overflow: 'auto',
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    media: {
        height: 140,
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
  }));

export default function InfoCard(props) {
    const{plan}=props;
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
                    <Typography
                        className={styles.title}
                        gutterBottom
                        variant='h5'
                    >
                        {plan.name}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                    >
                        ${plan.price}
                    </Typography>
                </CardContent>
                <CardContent>
                <List className={classes.root} subheader={<li />}>
                    <ul className={classes.ul}>
                        {plan.benefits.map((d, index) => (
                            <ListItem key={`cardInfo-${index}`}>
                                <ListItemText primary={d.title} />
                            </ListItem>
                        ))}
                    </ul>
                </List>
                    
                    {/* {plan.benefits.map((d, index) => (
                    <li key={`cardInfo-${index}`} paragraph>
                        {d.title}
                    </li>))} */}
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
