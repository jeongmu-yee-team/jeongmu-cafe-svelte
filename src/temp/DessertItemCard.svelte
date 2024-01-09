<script lang=ts>
        let products = [
            {
                id: 1,
                name: '허니 브레드',
                href: '#',
                price: '3500',
                imageSrc: './image/허니브레드.jpg',
                imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
            },
            {
                id: 2,
                name: '치즈케이크',
                href: '#',
                price: '3500',
                imageSrc: './image/치즈케익.jpg',
                imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
            },
            {
                id: 3,
                name: '티라미수 케이크',
                href: '#',
                price: '3500',
                imageSrc: './image/티라미수케이크.jpg',
                imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
            },
            {
                id: 4,
                name: '마카롱',
                href: '#',
                price: '4000',
                imageSrc: './image/마카롱.jpg',
                imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
            },
            {
                id: 5,
                name: '핫도그',
                href: '#',
                price: '4000',
                imageSrc: './image/핫도그.jpg',
                imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
            },
            {
                id: 6,
                name: '와플',
                href: '#',
                price: '4000',
                imageSrc: './image/핫도그.jpg',
                imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
            },
            {
                id: 7,
                name: '크로플',
                href: '#',
                price: '4000',
                imageSrc: './image/핫도그.jpg',
                imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
            },
        ];
        function handleClick(event: MouseEvent, href: string) {
            event.preventDefault();
            console.log('Clicked on:', href);
        }
    </script>
    
    <div class="card-display bg-white">
        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 class="sr-only">제품</h2>
       
          <div class="card-container grid grid-cols-4 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
           {#each products as product (product.id)}
                <div class="group active:transtion duration-75 ease-out active:scale-90 active:shadow-2xl">
                    <a href={product.href} class="group" on:click={(event) => handleClick(event, product.href)}>
                        <div class="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200">
                            <img src={product.imageSrc} alt={product.imageAlt} class="h-full w-full object-cover object-center group-hover:opacity-75" />
                        </div>
                    <h3 class="mt-4 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold text-gray-700">
                        {product.name}
                    </h3>
                <p class="mt-1 font-semibold text-orange-600">{product.price}원</p>
                    </a>
                </div>
            {/each}
           </div>
        </div>
    </div>