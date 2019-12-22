<div class="relative">
  <a href="/app/{{ $app->uid }}" class="absolute top-0 left-0 right-0 bottom-0"></a>
  <div class="flex py-1 pointer-events-none">
    <img src="{{ $app->icon }}" width="77" height="77" style="height:77px; border-radius: 1.3rem">
    <div class="pl-5 w-full">
      <div class="{{ theme('text-black') }}">{{ $app->name }}</div>
      <div class="leading-none text-sm {{ theme('text-gray-500') }}">{{ $app->short }}</div>
      <div class="flex items-center justify-start mt-1 pointer-events-auto">
        @foreach($app->providers as $provider)
          @component('components.tinyProviderIcon', ["provider" => $provider])@endcomponent
        @endforeach
      </div>
      <div class="pt-4 pointer-events-auto z-1 relative">
        @component('components.appButtons', ["app" => $app])@endcomponent
      </div>
      <hr class="w-full border-b-0 border-l-0 border-r-0 mt-3 {{ theme('border-gray-100') }}">
    </div>
  </div>
</div>