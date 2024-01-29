<script lang="ts">
  export let item: {
    product_name: string;
    product_thumbnail_url: string | null;
    product_price: number;
    product_type_id: number | null;
  };
</script>

<div
  class="active:transtion group rounded-lg border-2 text-center duration-75 ease-out active:scale-90
            active:shadow-2xl"
>
  <div class="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-b-lg bg-gray-200">
    <img
      src={item.product_thumbnail_url}
      alt={'사진'}
      class="h-full w-full object-cover object-center p-2 group-hover:opacity-75"
    />
  </div>
  <h3 class="mt-4 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold text-gray-700">
    {item.product_name}
  </h3>
  <p class="mt-2 pb-4 font-semibold text-orange-600">{item.product_price}원</p>
</div>
