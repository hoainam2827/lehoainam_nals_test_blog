import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Blogs } from '../redux/types/blogType'
import { RootStore } from '../utils/TypeScript'
import moment from 'moment'
import Loading from '../components/global/Loading'
import Search from '../components/global/Search'
import { getHomeBlogs } from '../redux/actions/blogActions'
import { Pagination } from 'antd'
import { debounce } from '../utils/common'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Home = () => {
	const SORT = {
		DESC: 'desc',
		ASC: 'asc'
	}

	const { homeBlogs } = useSelector((state: RootStore) => state)

	console.log('homeBlogs.data.items', homeBlogs.data)

	const [page, setPage] = useState<number>(1)
	const [pageSize, setPageSize] = useState<number>(10)
	const [search, setSearch] = useState<string>('')
	const [searchClone, setSearchClone] = useState<string>('')
	const [sortDirection, setSortDirection] = useState<string>(SORT.DESC)
	const [sortBy, setSortBy] = useState<string>('created_at')
	const [loading, setLoading] = useState(false)
	const [timeout, setTimeOut] = useState(1000)
	const dispatch = useDispatch()

	const handleSortBy = (e: any) => {
		setSortBy(e.target.value)
	}

	const handleSortDirection = (e: any) => {
		setSortDirection(e.target.value)
	}

	const handleChangePage = (valuePage: number, valuePageSize: number) => {
		console.log('valuePage', valuePage)
		console.log('valuePageSize', valuePageSize)
		setPage(valuePage)
		setPageSize(valuePageSize)
	}

	// const debounceDropDown = useRef(debounce((nextValue) => setSearch(nextValue), 1000)).current;

	const handleSearch = (value: string) => {
		setSearch(value)
		// debounce(() => setSearch(value), 300);
		// setSearchClone(value)
		// debounceDropDown(value)
	}

	const handelGetListBlog = async () => {
		setLoading(true)
		dispatch(getHomeBlogs(page, pageSize, search, sortBy, sortDirection))
		setLoading(false)
	}

	useEffect(() => {
		if (search) {
			console.log(search)
			debounce(timeout, setTimeOut, handelGetListBlog)
		} else {
			handelGetListBlog()
		}
	}, [page, pageSize, search, sortBy, sortDirection])

	// useEffect(() => {
	//   debounce(() => handelGetListBlog(), 300);
	// }, [search]);

	const opitonSort = [
		{
			label: 'ID',
			value: 'id',
			selected: false
		},
		{
			label: 'Title',
			value: 'title',
			selected: false
		},
		{
			label: 'Content',
			value: 'content',
			selected: false
		},
		{
			label: 'Created at',
			value: 'created_at',
			selected: true
		},
		{
			label: 'Updated at',
			value: 'updated_at',
			selected: false
		}
	]
	if (loading) return <Loading />
	return (
		<div className='home_page'>
			<div className='group-sort d-flex align-items-center'>
				<div className='search'>
					<input
						type='text'
						className='form-control me-2 w-100'
						value={search}
						placeholder='Enter your search...'
						// onChange={debouncedChangeHandler}  />
						onChange={(e) => handleSearch(e.target.value)}
					/>
				</div>
				<div className='sort-by'>
					<span className='title-sort'>Sort by:</span>
					<select className='form-select' aria-label='Default select example' onChange={(e) => handleSortBy(e)}>
						{opitonSort.map((item, index) => (
							<option key={index} value={item.value} selected={item.selected}>
								{item.label}
							</option>
						))}
					</select>
				</div>
				<div className='sort-by'>
					<span className='title-sort'>Sort Direction:</span>
					<select className='form-select' aria-label='Default select example' onChange={(e) => handleSortDirection(e)}>
						<option value={SORT.DESC}>DESC</option>
						<option value={SORT.ASC}>ASC</option>
					</select>
				</div>
			</div>

			{homeBlogs?.data?.items.map((homeBlog: any) => (
				<Link to={`/blog/${homeBlog.id}`} key={homeBlog.id}>
					{homeBlog && (
						<>
							<div className='card mb-3'>
								<div className='row g-0'>
									<div className='col-md-3'>
										<LazyLoadImage
											src={homeBlog.image.url}
											className='img-fluid rounded-start'
											alt='blog'
											effect='opacity'
										/>
									</div>
									<div className='col-md-9'>
										<div className='card-body'>
											<h5 className='card-title'>{homeBlog.title}</h5>
											<p className='card-text'>{homeBlog.content}</p>
											<p className='card-text'>
												<small className='text-muted'>
													Create at {moment(homeBlog.created_at).startOf('hour').fromNow()}
												</small>
											</p>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</Link>
			))}
			<Pagination
				current={page}
				defaultCurrent={1}
				total={homeBlogs?.pagination?.count}
				defaultPageSize={pageSize}
				onChange={handleChangePage}
			/>
		</div>
	)
}

export default Home
