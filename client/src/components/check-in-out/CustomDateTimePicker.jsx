import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

export default function CustomDateTimePicker ({ selectedDateTime, onDateTimeChange, customLabel, customDisablePast, customDisableFuture, customMinutesStep}) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker
            value={selectedDateTime}
            onChange={(newValue) => onDateTimeChange(newValue)}
            label={customLabel}
            format='DD/MM/YYYY hh:mm A'
            disableFuture={customDisableFuture}
            disablePast={customDisablePast}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            minutesStep={customMinutesStep}
            // ampm={false}
          />
        </DemoContainer>
    </LocalizationProvider>
  );
}
