declare class PostDto {
    title: string;
    userId: string;
}
declare class UpdatePostDto {
    title: string;
    liked: number;
    comments: [];
}
export { PostDto, UpdatePostDto };
