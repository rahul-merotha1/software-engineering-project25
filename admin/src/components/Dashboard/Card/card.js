import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  card_main: {
    borderRadius: 24,
    padding: '28px 36px',
    margin: 32,
    minWidth: 360,
    maxWidth: 460,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
    transition: 'all 0.3s ease',
    color: '#fff',
    '&:hover': {
      transform: 'translateY(-6px)',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.16)',
    }
  },
  teacher: {
    background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
  },
  student: {
    background: 'linear-gradient(135deg, #11998e, #38ef7d)',
  },
  subject: {
    background: 'linear-gradient(135deg, #ffb347, #ffcc33)',
    color: '#333'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  d: {
    display: 'flex',
    alignItems: 'baseline',
  },
  d1: {
    fontSize: 42,
    fontWeight: 800,
    marginRight: 6,
  },
  d2: {
    fontSize: 22,
    fontWeight: 500,
    opacity: 0.9
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid rgba(255,255,255,0.6)',
    backgroundColor: '#ffffff33',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
  }
});

export const MainCard = (props) => {
  const classes = useStyles();

  const getCardColorClass = () => {
    switch (props.title?.toLowerCase()) {
      case 'teacher':
        return classes.teacher;
      case 'student':
        return classes.student;
      case 'subject':
        return classes.subject;
      default:
        return '';
    }
  };

  return (
    <div className={`${classes.card_main} ${getCardColorClass()}`}>
      <div className={classes.textContainer}>
        <div className={classes.name}>{props.title}</div>
        <div className={classes.d}>
          <span className={classes.d1}>{props.value}</span>
          <span className={classes.d2}>/{props.total}</span>
        </div>
      </div>
      <img src={props.image} className={classes.img} alt='' />
    </div>
  );
};
