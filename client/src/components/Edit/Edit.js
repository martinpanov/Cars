export default function Edit() {
    return (
        <section id="sell-page">

            <h1>Edit Car Ad</h1>

            <div className="wrapper">
                <form action="/edit/{{car._id}}" method="post" id="sell-form">
                    <label><span>Manufacturer: </span></label>
                    <input type="text" name="manufacturer" placeholder="Manufacturer" value="{{car.manufacturer}}" />
                    <label><span>Model: </span></label>
                    <input type="text" name="model" placeholder="Model" value="{{car.model}}" />
                    <label><span>Price: </span></label>
                    <input type="number" name="price" placeholder="Price" value="{{car.price}}" />
                    <label><span>Year: </span></label>
                    <input type="number" name="year" placeholder="Year" value="{{car.year}}" />
                    <label><span>Phone Number: </span></label>
                    <input type="text" name="phoneNumber" placeholder="Phone Number" value="{{car.phoneNumber}}" />
                    <label><span>Description: </span></label>
                    {/* {{car.description}} */}
                    <textarea name="description" placeholder="Description"></textarea>
                    <label><span>Gearbox: </span></label>
                    <select name="gearbox">
                        {/* {{car.gearbox}} */}
                        <option value="{{car.gearbox}}" disabled selected></option>
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                    </select>
                    <label><span>Pictures: </span></label>
                    <input type="file" name="images" accept="image/*" value="{{car.images}}" />
                    <button>Update ad</button>
                </form>
            </div>

        </section>
    );
}