import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';

export default function DashboardShortcut ({ customColor, customLabel, customLink }) {
  const navigate = useNavigate();

  const handleClick = (customLink) => {
    navigate(customLink);
  };

  return (
      <Chip
        color={customColor}
        sx={{
          width: '100%',
          height: 'auto',
          justifyContent: 'center',
          padding: '10px 0px 10px 0px',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'pre-wrap',
          },
        }}
        label={customLabel}
        onClick={() => handleClick(customLink)}
      />
  );
}