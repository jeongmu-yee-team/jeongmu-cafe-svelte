<script lang="ts">
	interface Product {
		id: number;
		name: string;
		href: string;
		imageSrc: string;
		imageAlt: string;
		price: number;
		quantity: number;
	}

	const products: Product[] = [
		{
			id: 1,
			name: '말라비틀어진 황태',
			href: '#',
			price: 2000,
			imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
			imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
			quantity: 1,
		},
		{
			id: 2,
			name: '위가 뒤틀린 모택동',
			href: '#',
			price: 3000,
			imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
			imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
			quantity: 1,
		},
		{
			id: 3,
			name: '어셈블리어로 개발하는 장진욱',
			href: '#',
			price: 5000,
			imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
			imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
			quantity: 1,
		},
		{
			id: 4,
			name: '유일 정상인 권재현',
			href: '#',
			price: 2000,
			imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
			imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
			quantity: 1,
		},
	];

	let cart: Product[] = [];

	const addToCart = (product: Product) => {
		for (let item of cart) {
			if (item.id === product.id) {
				product.quantity += 1;
				cart = cart;
				return;
			}
		}
		cart = [...cart, product];
	};

	const removeFromCart = (product: Product) => {
    const updatedCart = cart.filter(item => item.id !== product.id);
    cart = updatedCart;
};

	const minusItem = (product: Product) => {
		for (let item of cart) {
			if (item.id === product.id) {
				if (product.quantity > 1) {
					product.quantity -= 1;
					cart = cart;
				} else {
					cart = cart.filter((cartItem) => cartItem != product);
				}
				return;
			}
		}
	};

	const plusItem = (product: Product) => {
		for (let item of cart) {
			if (item.id === product.id) {
				item.quantity += 1;
				cart = cart;
				return;
			}
		}
	};

	$: total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
</script>

<p>There are {cart.length} items in your cart</p>
<div class="product-list grid grid-flow-col grid-cols-4">
	{#each products as product}
		<div>
			<button on:click={() => addToCart(product)}>Add to cart</button>
		</div>
	{/each}
</div>

<div class="cart-list border-2 border-solid p-10">
	{#each cart as item}
		{#if item.quantity > 0}
			<div class="cart-item grid grid-flow-col grid-cols-4 p-10">
				<img width="50" src={item.imageSrc} alt={item.name} />
				<div>
					{item.quantity}
					<button on:click={() => plusItem(item)}>+</button>
					<button on:click={() => minusItem(item)}>-</button>
				</div>
				<p class=" m-2">{item.price * item.quantity} 원</p>
				<div>
					<button on:click={() => removeFromCart(item)} type="button" class="remove bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-300">
						<span class="sr-only">Close menu</span>
						<!-- Heroicon name: outline/x -->
						<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
						  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					  </button>
				</div>
			</div>
		{/if}
	{/each}
	<div class="total text-center">
		<h4>Total: {total} 원</h4>
	</div>
</div>
