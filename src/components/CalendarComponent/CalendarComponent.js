import React from 'react';
import { CalendarHeaderComponent } from '../HeaderComponent';
import { CalendarBodyComponent } from '../CalendarBodyComponent';
import styled, { ThemeProvider } from 'styled-components';

const CalendarComponentWrapper = styled.div`
	width: ${(props) =>
		props.theme.wrapper.width ? props.theme.wrapper.width + 'px' : '100%'};
	height: ${(props) =>
		props.theme.wrapper.height ? props.theme.wrapper.height + 'px' : '100%'};
`;

export function CalendarComponent({
	height,
	width,
	events,
	initialDate,
}) {
	const [currentMonth, setCurrentMonth] = React.useState(0);
	const [currentYear, setCurrentYear] = React.useState(0);

	const theme = React.useMemo(
		() => ({
			wrapper: {
				width: width ? width : 400,
				height: height ? height : 400,
			},
		}),
		[width, height]
	);

	return (
		<ThemeProvider theme={theme}>
			<CalendarComponentWrapper>
				<CalendarHeaderComponent
					currentMonth={currentMonth}
					currentYear={currentYear}
				/>
				<CalendarBodyComponent
					events={events ? events : []}
					currentMonth={currentMonth}
					currentYear={currentYear}
					setCurrentMonth={setCurrentMonth}
					setCurrentYear={setCurrentYear}
					initialDate={initialDate ? initialDate : new Date()}
				/>
			</CalendarComponentWrapper>
		</ThemeProvider>
	);
}
