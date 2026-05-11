import React from 'react';
import { LinearProgress, Paper, Slide, Snackbar, Stack, Typography } from '@mui/material';

const TransitionDown = (props) => {
    return <Slide {...props} direction="down" />;
};

const ProgressToast = ({ open, text = '처리 중입니다...' }) => {
    return (
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            TransitionComponent={TransitionDown}
        >
            <Paper
                elevation={6}
                sx={{
                    width: { xs: 280, sm: 340 },
                    borderRadius: '14px',
                    px: 2,
                    py: 1.5,
                    backgroundColor: '#ffffff',
                }}
            >
                <Stack spacing={1}>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#1f3d63' }}>
                        {text}
                    </Typography>
                    <LinearProgress
                        color="info"
                        sx={{
                            height: 8,
                            borderRadius: 999,
                            backgroundColor: '#e8eef7',
                            '& .MuiLinearProgress-bar': {
                                borderRadius: 999,
                            },
                        }}
                    />
                </Stack>
            </Paper>
        </Snackbar>
    );
};

export default ProgressToast;