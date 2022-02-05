// siteId, articleId 무작위 생성용 함수. min ~ max-1 사이 정수 반환
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

class Site {
    constructor() {
        this.boards = [];
        this.id = getRandomInt(1,10000); // Site id부여
    }
    addBoard(board) {
        if(this.boards.map(b => b.name).includes(board.name)){
            throw new Error('게시판 이름은 중복될 수 없습니다.')
        }
        this.boards.push(board); // board 값을 배열의 끝에 밀어넣기(push)
        board.siteId = this.id.toString(); // 입력된 board 객체에 siteId 부여
    }
    findBoardByName(boardName) {
        let [result] = this.boards.filter(function(board){
            return board.name === boardName;
        });
        
        return result;

        // for (this.board in this.boards){
            
        // }
        
    }
}

class Board {
    constructor(boardName) {
         if(boardName === '' || boardName === null){
            throw new Error("게시판 이름을 입력해주세요.");
        }
        this.name = boardName;
        this.articles = [];
        this.id = getRandomInt(50001,99999); // Site id부여
        this.siteId = 0;
    }
    publish(article){
        if (this.siteId === 0){ // 특정 사이트에 소속되지 않은 게시판인 경우 (1~10000 숫자 부여. 0은 최초값)
            throw new Error("생성되지 않은 게시판입니다.");
        } else if (article.subject === '' || article.subject === null || article.content === '' || article.content === null || article.author === '' || article.author === null) {
            throw new Error("빈 칸 없이 모두 입력해주세요.");
        }
        let articleIdFormat = this.name + '-' + getRandomInt(100001,200000).toString(); // '공지사항-100001~199999 형태로 articleId 부여
        const currentDate = new Date().toISOString();

        article.id = articleIdFormat; // article 입력 시 id 부여
        article.boardId = this.id.toString();
        article.createdDate = currentDate;
        this.articles.push(article);
    }
    getAllArticles(){
        return this.articles;
    }
}

class Article {
    constructor(article) {
        if(article.subject === '' || article.subject === null || article.content === '' || article.content === null || article.author === '' || article.author === null) {
            throw new Error('빈 칸없이 모두 입력해주세요.');
            // throw error('에러');
        }
        this.article = article;
        // this.subject = article.subject;
        // this.content = article.content;
        // this.author = article.author;
        this.boardId = 0;
        this.comments = [];      
    }
    reply(comment){
        if(this.boardId === 0){
            throw new Error("생성되지 않은 게시판입니다.");
        }
        const currentDate = new Date().toISOString();
        comment.createdDate = currentDate;
        this.comments.push(comment);
    }
    getAllComments(){
        return this.comments;
    }
}

class Comment {
    constructor(comment){
        if(comment.content === '' || comment.content === null || comment.author === '' || comment.author === null){
            throw new Error("코멘트에 필요한 내용을 모두 입력해주세요.");
        }
    }
}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};
