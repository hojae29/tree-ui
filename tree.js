class Tree {
    tree;

    constructor(el) {
        this.tree = el;
        this.init();
    }

    init() {
        const nodes = this.tree.querySelectorAll('li:has(>ul)>.node');

        nodes.forEach(el => {
            el.addEventListener('click', (ev) => {
                const target = ev.target;

                const li = target.closest('li');
                this.toggle(li);
            });
        });
    }

    toggle(li) {
        // 'expanded' 클래스가 있으면 제거하고, 없으면 추가
        const isExpanded = li.classList.toggle('expanded');

        // 'collapsed' 클래스를 'expanded'의 반대 상태로 토글
        li.classList.toggle('collapsed', !isExpanded);

        // 트리라인 렌더링
        this.renderLine(li);
    }

    getChilds(parentLi) {
        return parentLi.querySelectorAll(':scope > ul > li');
    }

    renderLine(target) {
        target.querySelectorAll(':scope > ul > .line').forEach(el => el.remove());

        const childs = this.getChilds(target);

        childs.forEach(child => {
            const Ydistance = this.calcAbsoluteYDistance(target, child);

            const div = document.createElement('div');
            div.classList.add('line');
            div.style.height = `${Ydistance}px`;

            target.querySelector(':scope > ul').appendChild(div);
        });

        const parent = target.closest('ul').closest('li');

        if (parent) {
            this.renderLine(parent);
        }
    }

    // 부모요소와 자식요소 간의 높이차이 계산
    calcAbsoluteYDistance(parentLi, childLi) {
        const parentRect = parentLi.getBoundingClientRect();
        const childRect = childLi.querySelector('.node').getBoundingClientRect();

        const scrollYOffset = window.scrollY;

        const parentAbsoluteY = parentRect.top + scrollYOffset;
        const childAbsoluteY = childRect.top + scrollYOffset;

        const absoluteDistance = childAbsoluteY - parentAbsoluteY - (childRect.height / 2);

        return absoluteDistance;
    };
}