export async function startRecording(setRecorderState: any) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        setRecorderState((prevState: any) => {
            return {
                ...prevState,
                initRecording: true,
                mediaStream: stream,
            };
        });
    } catch (err) {
        console.log(err);
    }
}

export function saveRecording(recorder: any) {
    if (recorder.state !== 'inactive') recorder.stop();
}
