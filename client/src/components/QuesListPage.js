import SortQuesBar from './SortQuesBar';
import QuesCard from './QuesCard';

import { Typography, Button, Divider, useMediaQuery } from '@material-ui/core';
import { useQuesListStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';

const QuesListPage = () => {
  const classes = useQuesListStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const questions = [
    {
      id: '1',
      author: {
        username: 'aman',
      },
      title: 'ques title loooooooooglll',
      body:
        'Lorem ipsum dolor si lobortiunc efficitur eleifend. Nunc tempor semper orci, quis pharetra turpis tristique eget. Donec ornare efficitur metus, id porta lacus commodo vitae. Fusce ullamcorper et ex sit amet dapibus. Cras efficitur, tellus quis dignissim dignissim, lacus ex volutpat metus, a aliquet tel ',
      tags: ['java', 'jssssssss', 'jaaaaaaaaaava', 'nice', 'okay'],
      points: 12,
      views: 18,
      acceptedAnswer: '10',
      answersCount: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '1',
      author: {
        username: 'aman',
      },
      title: 'ques title loooooooooglll',
      body:
        'Lorem ipsum dolor si lobortiunc efficitur eleifend. Nunc tempor semper orci, quis pharetra turpis tristique eget. Donec ornare efficitur metus, id porta lacus commodo vitae. Fusce ullamcorper et ex sit amet dapibus. Cras efficitur, tellus quis dignissim dignissim, lacus ex volutpat metus, a aliquet tel ',
      tags: ['java', 'jssssssss', 'jaaaaaaaaaava', 'nice', 'okay'],
      points: 12,
      views: 18,
      acceptedAnswer: '10',
      answersCount: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '1',
      author: {
        username: 'aman',
      },
      title: 'ques title loooooooooglll',
      body:
        'Lorem ipsum dolor si lobortiunc efficitur eleifend. Nunc tempor semper orci, quis pharetra turpis tristique eget. Donec ornare efficitur metus, id porta lacus commodo vitae. Fusce ullamcorper et ex sit amet dapibus. Cras efficitur, tellus quis dignissim dignissim, lacus ex volutpat metus, a aliquet tel ',
      tags: ['java', 'jssssssss', 'jaaaaaaaaaava', 'nice', 'okay'],
      points: 12,
      views: 18,
      acceptedAnswer: '10',
      answersCount: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '1',
      author: {
        username: 'aman',
      },
      title: 'ques title loooooooooglll',
      body:
        'Lorem ipsum dolor si lobortiunc efficitur eleifend. Nunc tempor semper orci, quis pharetra turpis tristique eget. Donec ornare efficitur metus, id porta lacus commodo vitae. Fusce ullamcorper et ex sit amet dapibus. Cras efficitur, tellus quis dignissim dignissim, lacus ex volutpat metus, a aliquet tel ',
      tags: ['java', 'jssssssss', 'jaaaaaaaaaava', 'nice', 'okay'],
      points: 12,
      views: 18,
      acceptedAnswer: '10',
      answersCount: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '1',
      author: {
        username: 'aman',
      },
      title: 'ques title loooooooooglll',
      body:
        'Lorem ipsum dolor si lobortiunc efficitur eleifend. Nunc tempor semper orci, quis pharetra turpis tristique eget. Donec ornare efficitur metus, id porta lacus commodo vitae. Fusce ullamcorper et ex sit amet dapibus. Cras efficitur, tellus quis dignissim dignissim, lacus ex volutpat metus, a aliquet tel ',
      tags: ['java', 'jssssssss', 'jaaaaaaaaaava', 'nice', 'okay'],
      points: 12,
      views: 18,
      acceptedAnswer: '10',
      answersCount: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '1',
      author: {
        username: 'aman',
      },
      title: 'ques title loooooooooglll',
      body:
        'Lorem ipsum dolor si lobortiunc efficitur eleifend. Nunc tempor semper orci, quis pharetra turpis tristique eget. Donec ornare efficitur metus, id porta lacus commodo vitae. Fusce ullamcorper et ex sit amet dapibus. Cras efficitur, tellus quis dignissim dignissim, lacus ex volutpat metus, a aliquet tel ',
      tags: ['java', 'jssssssss', 'jaaaaaaaaaava', 'nice', 'okay'],
      points: 12,
      views: 18,
      acceptedAnswer: '10',
      answersCount: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '1',
      author: {
        username: 'aman',
      },
      title: 'ques title loooooooooglll',
      body:
        'Lorem ipsum dolor si lobortiunc efficitur eleifend. Nunc tempor semper orci, quis pharetra turpis tristique eget. Donec ornare efficitur metus, id porta lacus commodo vitae. Fusce ullamcorper et ex sit amet dapibus. Cras efficitur, tellus quis dignissim dignissim, lacus ex volutpat metus, a aliquet tel ',
      tags: ['java', 'jssssssss', 'jaaaaaaaaaava', 'nice', 'okay'],
      points: 12,
      views: 18,
      acceptedAnswer: '10',
      answersCount: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '1',
      author: {
        username: 'aman',
      },
      title: 'ques title loooooooooglll',
      body:
        'Lorem ipsum dolor si lobortiunc efficitur eleifend. Nunc tempor semper orci, quis pharetra turpis tristique eget. Donec ornare efficitur metus, id porta lacus commodo vitae. Fusce ullamcorper et ex sit amet dapibus. Cras efficitur, tellus quis dignissim dignissim, lacus ex volutpat metus, a aliquet tel ',
      tags: ['java', 'jssssssss', 'jaaaaaaaaaava', 'nice', 'okay'],
      points: 12,
      views: 18,
      acceptedAnswer: '10',
      answersCount: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.topBar}>
        <Typography variant={isMobile ? 'h6' : 'h5'}>All Questions</Typography>
        <Button
          variant="contained"
          color="primary"
          size={isMobile ? 'small' : 'medium'}
        >
          Ask Question
        </Button>
      </div>
      <SortQuesBar isMobile={isMobile} />
      <Divider />
      {questions.map((q) => (
        <QuesCard key={q.id} question={q} />
      ))}
    </div>
  );
};

export default QuesListPage;
