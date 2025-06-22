## SpringSecurity

> https://docs.spring.io/spring-security/reference/6.4/index.html

### Prerequisites

**requisite**：必备品，必备条件

**prerequisite**：先决条件

**self-contained**：自给自足的、独立运行的。强调 “结构或功能的完整性”

**self-sufficiency**：自给自足的、强调 “生存能力的独立性”

**manner**：方式。in a 形容词 manner，以...的方式 -> 如 in a self-contained manner，以自给自足的方式。



### Community

**vast**：广阔的，茫茫的，广大。可以形容草原，也可以形容社区。

**stay/keep up to date with**：保持与…… 同步更新，了解…… 的最新情况。“stay/keep up to date” 表示 “保持最新状态”，“with” 后接需要跟进的对象（如信息、趋势、技术等）。



### Preparing for 7.0

#### Configuration

**migration**：迁徙，移民，洄游

**authorize**：授权，批准

**authenticate**：认证

**prior**：先前的，在前的，优先的。

| 词汇      | 区别要点                            | 例句对比                                    |
| --------- | ----------------------------------- | ------------------------------------------- |
| prior     | 更正式，可指 “时间先后” 或 “优先性” | Prior knowledge is necessary for this job.  |
| previous  | 侧重 “时间上的前一个”，更常用       | I missed the previous train.                |
| earlier   | 侧重 “时间更早”，口语化             | She arrived earlier than expected.          |
| preceding | 侧重 “顺序上紧接在前的”             | The preceding chapter discusses the theory. |

**nesting**：嵌套，筑巢

**customize**：定制、定做、按个人需求修改

**feature**：n. 特征、特点、功能  v. 以…… 为特色	、特写、放映

**flux**：根据语境选择译法：

- **物理 / 数学**：“通量”（magnetic flux 磁通量）、“流量”（water flux 水流量）
- **抽象概念**：“变化”“变动”（in flux 处于变化中）
- **化学 / 冶金**：“助焊剂”（solder flux）
- **计算机技术**：保留英文或译为 “通量”（Spring Flux 可译为 “Spring 通量框架”）

​	“flux” 的核心含义围绕 “流动” 和 “变化”，在不同领域衍生出专业定义（如磁通量、助焊剂、Spring Flux）

**indentation**：缩进、凹槽

**intergration**：一体化



### Migrating to 6.2

**patch**：n. 补丁 v. 补、打补丁

**instruction**：操作说明、指令、指示



### Getting Spring Security

**breaking changes**：重大变化，破坏性变化。（因为重大变化会破坏现有兼容性）

**typically**：通常

**typical**：典型的

**practice**：实践

**passive updates**：被动更新，即用户无需主动修改代码来适配次版本号的变更（因变更不破坏兼容性），仅需升级依赖的库或框架版本，即可被动获得新功能或优化。

**perfectly compatible, forwards and backwards**：完全的向前兼容和向后兼容

**demonstrate**：演示、证明

**aggregate**：聚合、汇总

**at times**：有时，较正式，强调 “在某些时刻“

**appropriate**：合适的

**consistent**：一致的、持续的、连贯的

**throughout the entire project**：在整个项目范围内

**against**：针对（介词）

**Spring Security builds against Spring Framework 6.2.7** ：Spring Security **针对** Spring Framework 6.2.7构建

**generally**：通常

**be likely to**：很可能

**run afoul of**：固定短语，意为 “与…… 产生冲突”、“遇到…… 问题”

**transitive dependencies**：传递依赖

**preceding**：前，上一个

**approach**：方法，途径

**candidate**：候选人



### Features

#### Authentication

**comprehensive**：综合的、全面的、全方位的

**verify**：核实、校验

**perform**：执行、完成、实施

**built-in**：内置的、嵌入的、原生自带的

**dedicate**：奉献

**be  dedicated to**：致力于...、献身于...、专注于...

**generic**：通用的



##### Password Storage

 **a one-way transformation of a password**：密码的单向转换

**throughout the years**：在这些年里、历经多年、多年以来

**mechanism**：机制、机理

**evolve**：发展、演变、进化

**assume**：认为、假定、假设

**malicious**：恶意的、恶毒的

**breach**：n，违反、（关系）破裂、（城墙）缺口、（系统）漏洞 / 入侵

​				v，违反、违背、突破 / 攻破（防御）

**lookup tables**：查找表

**mitigate**：缓解、减轻、缓和

**crack**：v，使破裂、砸开、破解、（使）发出爆裂声、说（笑话）；n，裂缝、缝隙、破裂声、尝试、俏皮话；adj，训练有素的、技艺高超的

**leverage**：v，利用、举债经营 n，影响力、杠杆作用、杠杆效力；

**be tuned to**：可理解为“被调整为……、适应于……

**trade off**：n，权衡、协调、此消彼长；v，权衡、以一物易另一物、交替使用

**excessive**：过多的、过量的、过度的

**irritate**：使恼怒、使烦躁、刺激（身体部位）、使疼痛

**drastically**：激烈地、大幅度地、彻底地

**intentionally**： 故意地、有意地

**intensive**：密集的、集中的、加强的、深入细致的

**long / short term**：长期/短期

**delegate**：v，授权、委托、选派（某人做某事）；n，代表

**prior to**：在…… 之前

**legacy**：n，遗产、遗赠财物、遗留问题、后遗症；adj，（计算机系统或产品）已过时但因使用广泛而难以替代的

**potential**：adj，潜在的、可能的；n，潜力、可能性、电位、电势

**This is not a concern**：这不是一个需要担心的事。“a concern” 表示 “一件令人担忧的事”

**By default**：默认情况下；在缺省状态下

**put together**：整合、组装、拼凑

**cumbersome**：笨重的、繁琐的、难处理的

**convenience**：方便、便利；便利的事物（或设施）

**is intended for**：旨在为……；预定给……；是为…… 而设计的

**troubleshooting**：n，故障排除、解决难题

**explicitly**：明确地、清楚明白地、直截了当地

**revert to**：恢复到（先前的状态、情况、行为等）；重提，重新采用（旧的方法、习惯等）

**resistant**：adj，抵抗的、有抵抗力的、耐…… 的；n，抵抗者、有抵抗力的东西

**deliberately**：故意地、蓄意地；从容不迫地、小心翼翼地

**indicate**：表明、显示；指出、指示；象征、暗示

**compromise**：n，妥协、折中方案；v，妥协、让步；违背（原则等）；使陷入危险、损害

**data breach**：数据泄露

**facilitate**：v，促进、促使；使便利、帮助

**desire**：n，欲望、渴望、心愿；v，渴望、期望、想要

**determine**：决定、确定；查明、测定；使下定决心



#### Protection Against Exploits

**protection against exploits**：防范（出于私利的）利用行为；防范漏洞利用

**concrete**：adj，具体的、实在的；混凝土制的；n，混凝土；v，用混凝土覆盖；使凝固、使固化；使具体（化）

**corresponding**：adj，相应的、对应的；相符的、一致的



##### CSFR

**automated**：adj，自动化的

**victim**：n，受害者、罹难者；牺牲品、受骗者

**predominant**：adj，主要的、占主导地位的；显著的、占优势的

**in addition to**：除了、此外

## SpringFrameWork——API文档

### org.springframework.web.bind.annotation

#### ResponseBody

**indicate**：v，表明、显示、指出、象征、暗示

