// localStorage에서 wishlist 불러오기
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// 페이지 로드 시 기존 wishlist 표시
window.onload = function() {
  displayWishlist();
};

// 영화 포스터 클릭 이벤트 설정
document.querySelectorAll('.movie-poster').forEach(poster => {
  poster.addEventListener('click', function() {
    const movieElement = this.parentElement;
    const movieId = movieElement.getAttribute('data-id');
    
    // 이미 wishlist에 있는지 확인
    if (!wishlist.includes(movieId)) {
      // wishlist에 추가
      wishlist.push(movieId);
      
      // localStorage에 저장
      localStorage.setItem('wishlist', JSON.stringify(wishlist));

      // 따봉 표시 및 wishlist 업데이트
      movieElement.querySelector('.thumbs-up').style.display = 'inline';
      addToWishlist(movieId);
    }
  });
});

// Wishlist에 영화 추가 함수
function addToWishlist(movieId) {
  const wishlistElement = document.getElementById('wishlist');
  
  // 영화 정보를 가져와서 추가 (여기서는 간단히 ID만 표시)
  const listItem = document.createElement('li');
  listItem.textContent = `영화 ID: ${movieId}`;
  
  wishlistElement.appendChild(listItem);
}

// Wishlist 표시 함수 (페이지 로드 시 호출)
function displayWishlist() {
  wishlist.forEach(movieId => addToWishlist(movieId));
}