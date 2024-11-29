export type TJobItem = {
    id: number;
    title: string;
    badgeLetters: string;
    company: string;
    daysAgo: number;
    relevanceScore: number
}

export type TJobItemExpanded = TJobItem & {
    description: string;
    qualifications: string[];
    reviews: string[];
    duration: string;
    location: string;
    salary: string;
    coverImgURL: string;
    companyURL: string;

}