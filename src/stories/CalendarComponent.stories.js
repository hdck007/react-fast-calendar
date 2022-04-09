import React from 'react';
import { storiesOf } from '@storybook/react';
import { CalendarComponent } from '../components/CalendarComponent';
const stories = storiesOf('App Test', module);

stories.add('App', () => (
	<CalendarComponent
		width={600}
		height={400}
		events={[
			{
				id: 1,
				date: new Date(2022, 1, 1),
				component: <span>Hello mello</span>,
			},
			{
				id: 1,
				date: new Date(2022, 0, 1),
				component: <span>buffalo mello</span>,
			},
		]}
	/>
));
