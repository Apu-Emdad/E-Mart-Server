 <body>
    <h1>
      E-Mart
    </h1>
    <p>
      E-Mart is an MERN E-Commerce app which sells clothes of different sizes
      and colors
    </p>  
    <p>Live Link: https://e-mart12.netlify.app/home </p>
    <p>Client(GitHub): https://github.com/Apu-Emdad/E-Mart-Client </p>
    <p>Server(GitHub): https://github.com/Apu-Emdad/E-Mart-Server </p>
    <h2>Technologies</h2>
    <p>
      React JS, Node JS, MongoDB, Express JS, Mongoose, JWT token, Redux
      Toolkit, Redux Persist, Axios, Firestorage, Stripe payment gateway,
      Bootstrap, Material UI (For Tables and Icons), Recharts, React-Slider
    </p>
    <h2>Feauters</h2>
    <h4><b>User Features</b></h4>
    <ul>
      <li>
        Users can register or log in with Email. The login process is secured by
        <b>JWT token</b> and <b>Crypto Js</b>
      </li>
      <li>
        Users can browse products from <i>products</i> page or
        <i>Feature</i> section from home page. Users can sort the products with
        size and color.
      </li>
      <li>
        Users can order using <b>Stripe</b> payment gateway. For testing purpose
        :
        <ul>
          <li>
            Card Number: 4242424242424242
          </li>
          <li>
            CVC: Any 3 digits
          </li>
          <li>
            Date: Any future date
          </li>
        </ul>
      </li>
      <li>
        Finally User can see his/her order status from dashboard section
      </li>
    </ul>
    <h4><b>Admin Features</b></h4>
    <span><b>Admin Email:</b> mod@mods</span>
    <span><b>Admin Password:</b> 123456</span>
    <ul>
      <li>
       The admins have protected dashboard route.
      </li>
      <li>
        Admins can upload new products. To upload product admins must have to
        provide image which will be stored in <b>Firestorage</b>
      </li>
      <li>
        Admins can make new admin. Also, admins can change the order status from
        pending to approved or shipped
      </li>
      <li>
        Admins can observe the latest transactions and user analytics
      </li>
    </ul>

  </body>
