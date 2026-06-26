
export const generateQR = async (eventId) => {
    try {

        return `qr_code_for_event_${eventId}`;
    } catch (error) {
        console.error('Error generating QR code:', error);
        return null;
    }
};
