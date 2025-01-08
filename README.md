<h1 align=center> Simple E-Commerce API</h1>
<h1>Overview</h1>
<img src="https://assets.roadmap.sh/guest/simple-ecommerce-api-thzqo.png" alt="project architecture">

<p>A comprehensive e-commerce API that integrates JWT authentication for secure user sessions and Stripe for payment processing. 
  It includes features such as user creation, shopping cart management, product listings, and the ability to create and edit products in the database. 
  The API allows users to add products to a cart, handle payments via Stripe, and manage product inventory dynamically.</p>

<h3>This API has the following features:</h3>
<ul>
  <li>JWT authentication for secure user sessions</li>
  <li>User registration and login</li>
  <li>Shopping cart management</li>
  <li>Integration with Stripe for payment processing</li>
  <li>Product listings and detailed view</li>
  <li>Ability to create new products</li>
  <li>Edit existing products in the database</li>
  <li>Manage product inventory dynamically</li>
  <li>Handle user payments and update cart status</li>
</ul>


<h4>Project idea from: <a href="https://roadmap.sh/projects/ecommerce-api">https://roadmap.sh/projects/ecommerce-api</a></h4>

<h2>How to Run the Project</h2>

<ol>
  <li><strong>Clone the project repo</strong></li>
  <pre><code>git clone https://github.com/NAJIB-B/simple-E-commerce-API.git</code></pre>

  <li><strong>Navigate into the project directory</strong></li>
  <pre><code>cd simple-E-commerce-API</code></pre>

  <li><strong>Install the dependencies</strong></li>
  <pre><code>npm install</code></pre>

  <li><strong>Create your own MongoDB database</strong></li>
  <p>(I used <a href="https://www.mongodb.com/products/platform/atlas-database">MongoDB Atlas</a>)</p>

  <li><strong>I used <a href="https://mailtrap.io/">mail trap</a> and <a href="https://nodemailer.com/">nodemailer </a>for my email service. you can check them out on npm</strong></li>
  <p>(So be sure to use those unless you want to edit the project and use something else)</p>


  <li><strong>Create your <code>.env</code> file</strong></li>
  <pre><code>touch .env</code></pre>

  <li><strong>Add the following environment variables</strong></li>
  <p>Populate the <code>.env</code> file with the following variables, replacing the placeholders with your own details:</p>

  <pre><code>DATABASE="mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.mongodb.net/&lt;database-name&gt;?retryWrites=true&amp;w=majority&amp;appName=Cluster0"

PORT=&lt;port&gt;
JWT_SECRET=&lt;your-access-token-secret&gt;
JWT_EXPIRES_IN=&lt;time-for-expiry&gt;
    
MAIL_HOST=&lt;your-mail-host&gt;
MAIL_PORT=&lt;your-mail-port&gt;
MAIL_USERNAME=&lt;your-mail-username&gt;
MAIL_PASSWORD=&lt;your-mail-password&gt;

STRIP_API_KEY=&lt;your-stripe-api-key&gt;
STRIPE_WEBHOOK_SECRET=&lt;your-stripe-webhook-secret&gt;


  
  </code></pre>




  <li><strong>Run the project</strong></li>
  <pre><code>npm start</code></pre>
</ol>
