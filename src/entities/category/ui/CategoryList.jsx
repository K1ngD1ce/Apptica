import CategoryItem from "./CategoryItem"
import cls from "./CategoryList.module.scss"

export default function CategoryList() {
    return (
        <div className={cls.categoryList}>
            <CategoryItem/>
            <CategoryItem/>
            <CategoryItem/>
            <CategoryItem/>
            <CategoryItem/>
            <CategoryItem/>
        </div>
    )
}