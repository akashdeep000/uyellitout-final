
export default function Page() {

    return (
        <main>
            <section className="px-4 py-10 mx-auto max-w-4xl">
                <h1 className="text-2xl font-bold text-center mb-6">Refund & Rescheduling Policy – Uyellitout</h1>
                <p className="mb-4">At UYELLITOUT, we are committed to providing valuable therapy sessions and assessments. To ensure a smooth experience for all clients, please review our policy below:</p>

                <h2 className="text-xl font-semibold mt-4">1. No Refund Policy</h2>
                <ul className="list-disc pl-6 mb-4">
                    <li>All payments made for therapy sessions and assessment tests are non-refundable.</li>
                    <li>If a client fails to attend a session, no refund will be issued.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-4">2. Rescheduling Policy</h2>
                <ul className="list-disc pl-6 mb-4">
                    <li>Clients can reschedule their session up to 2 times if they inform us at least 24 hours before the scheduled session.</li>
                    <li>Rescheduling requests made less than 24 hours before the session will not be accepted.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-4">3. No-Show & Cancellations</h2>
                <ul className="list-disc pl-6 mb-4">
                    <li>Cancellation is not an option. Once booked, a session cannot be canceled for a refund.</li>
                    <li>If a client does not attend the session without prior notice, the session will be considered forfeited, and no refund or rescheduling will be allowed.</li>
                    <li>However, we understand that unforeseen circumstances may arise. If a client informs us in advance about an unavoidable situation, we may consider rescheduling once at our discretion.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-4">4. Payment Methods</h2>
                <ul className="list-disc pl-6 mb-4">
                    <li>We accept payments via our online payment gateway only.</li>
                    <li>In case of a technical error during payment processing, we will collect the payment via UPI.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-4">5. Contact Us</h2>
                <p className="mb-4">For any rescheduling requests or concerns, please reach out to us:</p>
                <p className="font-semibold">Phone: <span className="text-blue-600">8584034584</span></p>
                <p className="font-semibold">Email: <a href="mailto:uyellitout@gmail.com" className="text-blue-600">uyellitout@gmail.com</a></p>

                <p className="mt-6">Thank you for choosing <span className="font-semibold">UYELLITOUT</span> for your therapy needs. We appreciate your understanding and cooperation!</p>
            </section>
        </main>
    );
}