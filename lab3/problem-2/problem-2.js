document.addEventListener('DOMContentLoaded', () => {
    const { interval, Subject } = rxjs;
    const { takeUntil } = rxjs.operators;

    const startButton = document.getElementById('startButton');
    const inputHours = document.getElementById('input-hours');
    const inputMinutes = document.getElementById('input-minutes');
    const inputSeconds = document.getElementById('input-seconds');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');


    const stopTimer$ = new Subject();

    function startCountdown(hours, minutes, seconds) {
        let time = hours * 3600 + minutes * 60 + seconds;

        interval(1000).pipe(
            takeUntil(stopTimer$)
        ).subscribe(() => {
            if (time <= 0) {
                stopTimer$.next(); 
                return;
            }

            time -= 1;
            const remainingHours = Math.floor(time / 3600);
            const remainingMinutes = Math.floor((time % 3600) / 60);
            const remainingSeconds = time % 60;

            hoursElement.textContent = String(remainingHours).padStart(2, '0');
            minutesElement.textContent = String(remainingMinutes).padStart(2, '0');
            secondsElement.textContent = String(remainingSeconds).padStart(2, '0');
        });
    }

    rxjs.fromEvent(startButton, 'click').subscribe(() => {
        const hours = parseInt(inputHours.value, 10) || 0;
        const minutes = parseInt(inputMinutes.value, 10) || 0;
        const seconds = parseInt(inputSeconds.value, 10) || 0;

        startCountdown(hours, minutes, seconds);
    });
});
