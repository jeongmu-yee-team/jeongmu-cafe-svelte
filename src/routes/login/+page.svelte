<script lang="ts">
  let username = '';
  let password = '';

  function handleLogin() {
    alert(`Username: ${username}\nPassword: ${password}`);
  }
</script>

<div>
  <!-- 헤더 영역 시작 -->
  <header class="bg-gray-800 p-4 text-white">
    <h1 class="text-2xl font-semibold">정무 카페</h1>
    <!-- 추가적인 헤더 내용을 원하는 대로 추가할 수 있습니다. -->
  </header>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-96 rounded bg-white p-8 shadow-md">
      <h2 class="mb-4 text-2xl font-semibold">관리자 로그인</h2>
      <form>
        <div class="mb-4">
          <label for="username" class="mb-2 block text-sm font-medium text-gray-600">ID</label>
          <input
            type="text"
            id="username"
            bind:value={username}
            class="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="mb-2 block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            bind:value={password}
            class="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button
          type="button"
          on:click={handleLogin}
          class="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600">로그인</button
        >
      </form>
    </div>
  </div>
</div>
