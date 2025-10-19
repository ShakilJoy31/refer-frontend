export default function LocationComponent() {
    const location = {
        lat: 24.8211,
        lng: 89.3628,
    };

    return (
        <section className="max-w-7xl mx-auto px-4 pb-24 ">
            <div className="w-full h-[600px] md:h-[80vh]"> {/* Adjust height as needed */}
                <iframe
                    title="School Location"
                    src={`https://www.google.com/maps?q=${location.lat},${location.lng}&hl=es;z=17&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                    loading="lazy"
                />
            </div>
        </section>
    );
}
